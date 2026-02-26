# Automatic AWS deployment

This app can be deployed to AWS EC2 automatically on every push to `main`, or manually via GitHub Actions.

## Overview

1. **Infrastructure** (one-time): AWS CDK in `infrastructure/` provisions an EC2 instance with Docker, Nginx, and optional repo clone.
2. **Deploy workflow**: On push to `main`, GitHub Actions runs the deploy script on the EC2 via AWS SSM (no SSH keys needed).
3. **On EC2**: The script pulls the latest code, builds the app Docker image, and runs `docker-compose --profile prod up -d`, then runs migrations.

## First-time setup

### 1. Deploy the CDK stack (infrastructure)

From the **repository root** (parent of `tutorme-app` and `infrastructure`):

```bash
cd infrastructure
npm ci
npm run build
npx cdk bootstrap   # first time per account/region
npx cdk deploy      # creates EC2, VPC, Nginx, Docker
```

Optional: clone the repo on the EC2 at first boot. In `infrastructure/cdk.json` add under `"context"`:

```json
"repoUrl": "https://github.com/YOUR_ORG/Tutor-2.git"
```

For a **private** repo, clone manually once via SSM or SSH (see step 3).

Note the **Elastic IP** and **Instance ID** from the stack outputs.

### 2. Prepare the EC2 (one-time)

- **If you set `repoUrl`**: Wait a few minutes after first deploy, then ensure the clone succeeded (e.g. SSM “Start session” and `ls /opt/tutorme`).
- **If you did not set `repoUrl`**: Start an SSM session (or SSH) and run:

  ```bash
  sudo mkdir -p /opt/tutorme
  sudo chown ec2-user:ec2-user /opt/tutorme
  git clone https://github.com/YOUR_ORG/Tutor-2.git /opt/tutorme
  ```

- Create the app env file on the EC2:

  ```bash
  sudo -u ec2-user bash -c 'cat > /opt/tutorme/tutorme-app/.env << "ENVEOF"
  DATABASE_URL=postgresql://postgres:postgres_password@localhost:5432/tutorme
  DATABASE_POOL_URL=postgresql://postgres:postgres_password@localhost:5433/tutorme
  REDIS_URL=redis://localhost:6379
  NEXTAUTH_SECRET=your_secret_min_32_chars
  NEXTAUTH_URL=https://your-domain.com
  OLLAMA_URL=http://localhost:11434
  # Add other vars from .env.example
  ENVEOF'
  ```

  Or copy your local `.env` (without committing it) to the server.

### 3. IAM user for GitHub Actions

Create an IAM user (or role) that GitHub Actions will use to call AWS:

1. In AWS IAM, create a user (e.g. `github-tutorme-deploy`). Do **not** enable console login.
2. Attach an inline or customer policy like:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudformation:DescribeStacks",
        "cloudformation:DescribeStackEvents"
      ],
      "Resource": "arn:aws:cloudformation:*:*:stack/InfrastructureStack/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ssm:SendCommand",
        "ssm:GetCommandInvocation"
      ],
      "Resource": [
        "arn:aws:ec2:*:*:instance/*",
        "arn:aws:ssm:*:*:document/AWS-RunShellScript"
      ]
    }
  ]
}
```

3. Create an access key for that user and store the **Access Key ID** and **Secret Access Key** in GitHub:
   - Repo → Settings → Secrets and variables → Actions
   - Add secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
4. Optional: set variable `AWS_REGION` (e.g. `us-east-1`) if you don’t use the default.

### 4. Point DNS to the Elastic IP

Point your domain (e.g. `solocorn.co`) to the Elastic IP from the CDK output. Then (on the EC2) run Certbot for HTTPS:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## How automatic deploy works

- **Trigger**: Push to `main`, or run the “Deploy to AWS” workflow manually (Actions → Deploy to AWS → Run workflow).
- **Steps**:
  1. Workflow checks out the repo and configures AWS with the credentials above.
  2. It reads the EC2 Instance ID from the CloudFormation stack output `TutormeAppInstanceId`.
  3. It sends an SSM “RunShellScript” command to that instance to run `tutorme-app/scripts/aws-deploy.sh` with `REPO_ROOT=/opt/tutorme`.
  4. On the EC2, the script: `git pull`, then `docker-compose --profile prod build --pull` and `up -d`, then `prisma migrate deploy` inside the app container.

## Manual deploy on the EC2

SSH or SSM into the EC2, then:

```bash
cd /opt/tutorme
bash tutorme-app/scripts/aws-deploy.sh
```

Or with a different repo path:

```bash
REPO_ROOT=/path/to/repo bash /path/to/repo/tutorme-app/scripts/aws-deploy.sh
```

## Troubleshooting

- **“TutormeAppInstanceId not found”**: Deploy the CDK stack first (`cd infrastructure && npx cdk deploy`). Ensure the stack name in the workflow (`InfrastructureStack`) matches.
- **SSM “Association not found” or command never runs**: The EC2 must have the SSM agent and the instance role with `AmazonSSMManagedInstanceCore`. Reboot the instance and wait a few minutes after first deploy.
- **Deploy script fails**: Check the workflow “Show deploy output” step for stdout/stderr. On the EC2, run the script by hand and fix `.env`, disk space, or Docker errors.
- **App not reachable**: Ensure Nginx is proxying to `http://127.0.0.1:3003` and the app container is up (`docker compose --profile prod ps`).
