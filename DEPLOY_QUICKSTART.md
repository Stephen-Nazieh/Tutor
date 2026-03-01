# 🚀 TutorMe AWS Deployment - Quick Start

> **New to AWS?** This guide assumes no prior knowledge. Follow each step carefully.

## 📚 Quick Navigation

| If you want to... | Go to... |
|-------------------|----------|
| Set up AWS credentials for the first time | [AWS Credentials Setup](#-prerequisites-aws-credentials-setup-one-time) |
| Deploy to your existing EC2 (solocorn-server) | [Option B](#step-1-run-the-deployment-script) |
| Create new EC2 instance (recommended) | [Option A](#step-1-run-the-deployment-script) |
| Fix "AWS credentials not configured" error | [Troubleshooting](#-troubleshooting) |

---

## 📋 Prerequisites: AWS Credentials Setup (One-time)

Before deploying, you need to configure AWS credentials. This is a **one-time setup**.

### Step 1: Get Your AWS Access Keys

Follow these steps carefully:

#### 1.1 Log into AWS Console
1. Go to https://aws.amazon.com/console/
2. Click **"Sign In to the Console"** (orange button)
3. Enter your email/username and password
4. Make sure you're in the **"Ohio (us-east-2)"** region (check top right corner of the page)

#### 1.2 Navigate to Security Credentials
1. Click on your **name** in the top-right corner of the screen
2. From the dropdown menu, click **"Security credentials"**

![AWS Console Menu](https://docs.aws.amazon.com/images/IAM/latest/UserGuide/images/security-credentials.png)

#### 1.3 Create Access Key
1. Scroll down to the **"Access keys"** section
2. Click the **"Create access key"** button (blue button)
3. You'll see a popup asking "Which use case?"
   - Select **"Command Line Interface (CLI)"**
   - Check the box that says "I understand..."
   - Click **"Next"**
4. (Optional) Add a description tag like "TutorMe Deployment"
5. Click **"Create access key"**

#### 1.4 Save Your Credentials (IMPORTANT!)
⚠️ **This is your ONLY chance to see the Secret Access Key!**

You will see:
- **Access key ID**: Looks like `AKIAIOSFODNN7EXAMPLE` (20 characters)
- **Secret access key**: Looks like `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` (40 characters)

**Do this NOW:**
1. Click the **"Copy"** button next to each key
2. Paste them into a secure password manager or text file
3. **Never share these keys or commit them to Git!**

---

### Step 2: Configure AWS CLI on Your Computer

#### 2.1 Install AWS CLI (if not installed)

**Mac:**
```bash
# Check if already installed
aws --version

# If not installed, install with Homebrew:
brew install awscli
```

**Windows:**
1. Download from: https://awscli.amazonaws.com/AWSCLIV2.msi
2. Run the installer
3. Open PowerShell and verify: `aws --version`

**Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

#### 2.2 Configure AWS Credentials

Open your terminal and run:

```bash
aws configure
```

You'll be prompted for 4 values:

```
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-2
Default output format [None]: json
```

**Where to get these values:**
- **AWS Access Key ID**: From Step 1.4 above
- **AWS Secret Access Key**: From Step 1.4 above
- **Default region name**: Type `us-east-2` (Ohio region)
- **Default output format**: Type `json`

#### 2.3 Verify Configuration

Test that it works:

```bash
aws sts get-caller-identity
```

You should see output like:
```json
{
    "UserId": "AIDACKCEVSQ6C2EXAMPLE",
    "Account": "445875721173",
    "Arn": "arn:aws:iam::445875721173:user/your-username"
}
```

If you see this, you're ready to deploy! ✅

---

## ⚡ Deploy TutorMe (3 Steps)

Now that AWS is configured, you can deploy:

### Step 2: Update DNS (Manual - 2 minutes)

1. Open AWS Console → Route 53 → Hosted zones → solocorn.co
2. Create/Update A records:
   - `@` → Your Elastic IP (shown in script output)
   - `www` → Your Elastic IP

### Step 3: Wait & Verify

```bash
# Check if app is running (may take 5-10 minutes)
curl https://solocorn.co/api/health

# Or use the helper script
./check-status.sh
```

---

## 📦 What Was Created

### Scripts Provided

| Script               | Purpose | When to Use |
|--------              |---------|-------------|
| `deploy.sh`          | Full automated deployment  | **Recommended for first deploy** |
| `deploy-existing.sh` | Deploy to existing EC2     | Use your current `solocorn-server` |
| `deploy-simple.sh`   | Infra only + manual steps  | If you want more control |
| `deploy.ps1`         | Windows PowerShell version | Windows users |
| `check-status.sh`    | Check deployment status    | After deployment |
| `view-logs.sh`       | View application logs      | Debugging |
| `ssh-to-server.sh`   | SSH into EC2               | Server management |
| `update-app.sh`      | Update application         | After code changes |

### Files Created in `tutorme-app/`

- `.env.production`         - Production environment variables
- `Dockerfile.production`   - Docker image definition
- `docker-compose.prod.yml` - Docker services configuration

### Files Created in Project Root

- `.deployment-info` - Saved deployment details

---

## 🔧 Common Commands

### View Application Logs
```bash
./view-logs.sh
# Or manually:
aws ssm start-session --target i-INSTANCE_ID
docker-compose -f docker-compose.prod.yml logs -f app
```

### Update Application (After Code Changes)
```bash
./update-app.sh
```

### SSH into Server
```bash
./ssh-to-server.sh
# Or manually:
aws ssm start-session --target i-INSTANCE_ID --region us-east-2
```

### Restart Application
```bash
./ssh-to-server.sh
# Then on server:
sudo docker-compose -f docker-compose.prod.yml restart
```

---

## 🌐 Application URLs

After deployment:
- **Main App**: https://solocorn.co
- **Health Check**: https://solocorn.co/api/health
- **WebSocket**: wss://solocorn.co/api/socket

---

## ⚠️ Important: Add Your API Keys

After first deployment, edit `tutorme-app/.env.production` and add:

```bash
KIMI_API_KEY="your_actual_kimi_key"
ZHIPU_API_KEY="your_actual_zhipu_key"
```

Then redeploy:
```bash
./update-app.sh
```

---

## 🗺️ Architecture Overview

```
User → Route 53 (DNS) → EC2 (Nginx + SSL) → Docker (Next.js + DB + Redis + AI)
```

**AWS Services Used:**
- Route 53 (DNS) - ✅ Already configured
- EC2 (Server) - $30/month
- Elastic IP (Static IP) - Free

**Docker Services:**
- App (Next.js + Socket.io)
- PostgreSQL (Database)
- Redis (Cache + Sessions)
- Ollama (Local AI)

---

## ⏱️ Timeline

| Step | Time |
|------|------|
| Run deploy.sh | 5-10 minutes |
| Update DNS | 2 minutes |
| DNS Propagation | 5-60 minutes |
| Docker Build on EC2 | 5-10 minutes |
| **Total Time to Live** | **~15-30 minutes** |

---

## 🆘 Troubleshooting

### "AWS credentials not configured!" Error

If you see this error, your AWS CLI isn't set up:

```bash
# Check if AWS CLI is installed
aws --version

# If not installed, see Step 2.1 above

# Check if credentials are configured
aws sts get-caller-identity

# If it says "Unable to locate credentials", run:
aws configure
```

### "Access denied" or "Unauthorized" Error

Your AWS user doesn't have enough permissions. You need:
- AmazonEC2FullAccess
- AmazonRoute53FullAccess
- AWSCloudFormationFullAccess
- IAMFullAccess (for CDK)

**To add permissions:**
1. AWS Console → IAM → Users → [Your Username]
2. Click **"Add permissions"** → **"Attach existing policies directly"**
3. Search for and add the policies above
4. Click **"Next"** → **"Add permissions"**

### Script fails at CDK deployment
```bash
# Check AWS credentials (should show Account: 445875721173)
aws sts get-caller-identity

# Try manual CDK deploy
cd infrastructure
npx cdk bootstrap aws://445875721173/us-east-2
npx cdk deploy --require-approval never
```

### App doesn't respond
```bash
# Check EC2 status
./check-status.sh

# SSH and check Docker
./ssh-to-server.sh
docker-compose -f docker-compose.prod.yml ps
```

### SSL Certificate Error
DNS may not have propagated. Wait 10-30 minutes and run:
```bash
./ssh-to-server.sh
sudo certbot --nginx -d solocorn.co -d www.solocorn.co
```

---

## 💰 Cost Breakdown

### New Infrastructure (t3.medium - Recommended)
| Service | Monthly Cost |
|---------|-------------|
| EC2 t3.medium | ~$30 |
| EBS 30GB | ~$3 |
| Data Transfer | ~$5-20 |
| **Total** | **~$40-55** |

### Existing Instance (t2.micro - Limited Resources)
| Service | Monthly Cost |
|---------|-------------|
| EC2 t2.micro | ~$8 |
| EBS 30GB | ~$3 |
| Data Transfer | ~$2-10 |
| **Total** | **~$13-21** |

**Note:** t2.micro has only 1GB RAM which may struggle with PostgreSQL + Redis + Ollama. Consider using external AI providers (Kimi/Zhipu) instead of local Ollama on t2.micro.

---

## 📖 More Documentation

- Full deployment guide: `DEPLOYMENT.md`
- CDK infrastructure: `infrastructure/README.md`
- Application docs: `tutorme-app/README.md`

---

## 🔐 Security Reminder

**Never commit AWS credentials to Git!** Your credentials files are automatically ignored by `.gitignore`, but always double-check:

```bash
# These files contain secrets - NEVER commit them:
~/.aws/credentials
~/.aws/config
tutorme-app/.env.production
```

If you accidentally commit credentials:
1. Delete the access key immediately in AWS Console
2. Create a new access key
3. Run `aws configure` with the new key

---

## ✅ Post-Deployment Checklist

- [ ] AWS credentials configured (`aws sts get-caller-identity` works)
- [ ] App loads at https://solocorn.co
- [ ] SSL certificate is valid (green lock)
- [ ] API keys added to .env.production
- [ ] Database migrations ran successfully
- [ ] Ollama model downloaded
- [ ] WebSocket connections working
- [ ] Test user registration/login

**You're all set! 🎉**
