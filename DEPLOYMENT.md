# TutorMe AWS Deployment Guide

This guide will walk you through deploying TutorMe to AWS using the provided scripts.

> **Beginner-friendly:** No prior AWS knowledge required. Each step includes detailed instructions.

## 📚 Quick Navigation

| Topic | Section |
|-------|---------|
| First-time AWS setup (credentials) | [Prerequisites](#-prerequisites) |
| Already have AWS credentials? | [Quick Start](#-quick-start-recommended) |
| Deploy to existing EC2 instance | [Existing EC2](#-deploying-to-existing-ec2-instance) |
| Troubleshooting errors | [Troubleshooting](#-troubleshooting) |
| Security best practices | [Security](#-security-best-practices) |
| Cost information | [Cost Breakdown](#-cost-breakdown) |

## 📋 Prerequisites

Before starting, ensure you have:

### 1. AWS Account and Credentials

You need an AWS account and credentials to deploy resources.

#### Step 1.1: Create AWS Account (if you don't have one)
1. Go to https://aws.amazon.com/free/
2. Click **"Create a Free Account"**
3. Follow the signup process (requires credit card for verification)
4. Choose the **Basic (Free)** support plan

#### Step 1.2: Get Your AWS Access Keys

You need to create an Access Key ID and Secret Access Key.

**Navigate to Security Credentials:**
1. Log into AWS Console: https://console.aws.amazon.com/
2. Make sure you're in the **"Ohio (us-east-2)"** region (top right corner)
3. Click your **name** in the top-right corner
4. Select **"Security credentials"** from the dropdown

![Security Credentials Menu](https://docs.aws.amazon.com/images/IAM/latest/UserGuide/images/security-credentials.png)

**Create Access Key:**
1. Scroll down to **"Access keys"** section
2. Click **"Create access key"**
3. Select **"Command Line Interface (CLI)"**
4. Check the acknowledgment box
5. Click **"Next"**
6. (Optional) Add a description like "TutorMe Deployment"
7. Click **"Create access key"**

**Save Your Keys (IMPORTANT!):**
```
Access key ID:     AKIAIOSFODNN7EXAMPLE     (20 characters)
Secret access key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY     (40 characters)
```

⚠️ **WARNING:** This is the ONLY time you can see the Secret Access Key. Copy both keys and save them securely (password manager, secure notes). Never share them or commit them to Git.

#### Step 1.3: Install AWS CLI

**Mac (using Homebrew):**
```bash
# Check if already installed
aws --version

# If not installed:
brew install awscli
```

**Windows:**
1. Download: https://awscli.amazonaws.com/AWSCLIV2.msi
2. Run installer
3. Open Command Prompt or PowerShell
4. Verify: `aws --version`

**Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
```

#### Step 1.4: Configure AWS CLI

Open terminal and run:

```bash
aws configure
```

Enter these values when prompted:
```
AWS Access Key ID [None]: AKIA...        (paste your Access Key ID)
AWS Secret Access Key [None]: wJal...    (paste your Secret Access Key)
Default region name [None]: us-east-2
Default output format [None]: json
```

**Verify it works:**
```bash
aws sts get-caller-identity
```

Expected output:
```json
{
    "UserId": "AIDACKCEVSQ6C2EXAMPLE",
    "Account": "445875721173",
    "Arn": "arn:aws:iam::445875721173:user/your-username"
}
```

### 2. Node.js (v18 or higher) and npm

**Check if installed:**
```bash
node --version  # Should show v18.x.x or higher
npm --version
```

**Install if needed:**
- Mac: `brew install node`
- Windows: https://nodejs.org/ (download LTS version)
- Linux: Use your package manager (apt, yum, etc.)

### 3. Docker (for local building)

**Check if installed:**
```bash
docker --version
```

**Install if needed:**
- Mac/Windows: https://www.docker.com/products/docker-desktop
- Linux: Use your package manager

### 4. Domain in Route 53 (Already Set Up!)

Your domain `solocorn.co` is already registered in Route 53. No action needed here.

## 🚀 Quick Start (Recommended)


### Option 1: Full Automated Deployment (Linux/Mac) - **Recommended for Production**

Creates a new t3.medium EC2 instance with all infrastructure:

```bash
# From project root
chmod +x deploy.sh
./deploy.sh
```

This script will:
1. Check prerequisites (AWS Account: **445875721173**)
2. Create environment files
3. Build Docker images
4. Deploy infrastructure via CDK
5. Transfer files to EC2
6. Start the application


### Option 2: Deploy to Existing EC2 Instance (Faster)

If you already have the `solocorn-server` EC2 instance running:

```bash
chmod +x deploy-existing.sh
./deploy-existing.sh
```

This deploys directly to your existing instance without creating new infrastructure.

### Option 3: Simple Deployment (More Control)

```bash
chmod +x deploy-simple.sh
./deploy-simple.sh
```

This deploys infrastructure only, then gives you manual steps to complete.

### Option 4: Windows PowerShell

```powershell
# Run as Administrator
.\deploy.ps1
```

## 📁 What Gets Created

### Local Files

| File | Description |
|------|-------------|
| `tutorme-app/.env.production` | Production environment variables |
| `tutorme-app/Dockerfile.production` | Docker image definition |
| `tutorme-app/docker-compose.prod.yml` | Docker Compose configuration |
| `.deployment-info` | Saved deployment details (Instance ID, IP, etc.) |

### Deployment Scripts

| Script | Purpose | AWS Account |
|--------|---------|-------------|
| `deploy.sh` | Full CDK deployment (new t3.medium) | 445875721173 |
| `deploy-existing.sh` | Deploy to existing EC2 instance | 445875721173 |
| `deploy-simple.sh` | Infra only + manual steps | 445875721173 |
| `deploy.ps1` | Windows PowerShell version | 445875721173 |
| `check-status.sh` | Check deployment status | - |
| `view-logs.sh` | View application logs | - |
| `ssh-to-server.sh` | SSH into EC2 | - |
| `update-app.sh` | Update application | - |

### AWS Resources (via CDK)

| Resource | Purpose | Cost (Monthly) |
|----------|---------|----------------|
| EC2 T3.Medium | Application server (recommended) | ~$30 |
| EC2 T2.Micro | Application server (existing) | ~$8 |
| Elastic IP | Static IP address | Free (in use) |
| EBS 30GB | Persistent storage | ~$3 |
| VPC | Networking | Free |

**Total estimated cost: ~$35-50/month (t3.medium) or ~$10-15/month (t2.micro)**

**Note:** Your existing `solocorn-server` is a t2.micro with limited resources (1 vCPU, 1GB RAM). For production use with PostgreSQL + Redis + Ollama, we recommend upgrading to t3.medium (2 vCPU, 4GB RAM).

## 🔧 Step-by-Step Manual Deployment

If you prefer manual control, follow these steps:

### Step 1: Deploy Infrastructure

```bash
cd infrastructure
npm install
npx cdk bootstrap aws://445875721173/us-east-2
npx cdk deploy
```

Note the outputs:
- `TutormeAppPublicIP`: Your server's IP address
- `TutormeAppInstanceId`: EC2 instance ID

### Step 2: Update DNS

1. Go to AWS Console → Route 53 → Hosted zones → solocorn.co
2. Create or update A records:
   - Name: (blank), Type: A, Value: [Your Elastic IP]
   - Name: www, Type: A, Value: [Your Elastic IP]

### Step 3: Prepare Application Files

```bash
cd tutorme-app

# Create .env.production
cp .env.example .env.production
# Edit and add your API keys

# Create Dockerfile.production
# (copy from scripts/Dockerfile.production)

# Create docker-compose.prod.yml
# (copy from scripts/docker-compose.prod.yml)
```

### Step 4: Transfer Files to EC2

```bash
# Connect to instance
aws ssm start-session --target i-YOUR_INSTANCE_ID --region us-east-2

# On the EC2 instance:
sudo mkdir -p /opt/tutorme
# Copy files using SCP or S3
```

### Step 5: Deploy on EC2

```bash
# SSH into EC2
aws ssm start-session --target i-INSTANCE_ID --region us-east-2

# Run deployment script
cd /opt/tutorme
sudo bash scripts/deploy-to-ec2.sh
```

---

## 🖥️ Deploying to Existing EC2 Instance

If you already have an EC2 instance (like your `solocorn-server`), use the `deploy-existing.sh` script:

```bash
./deploy-existing.sh
```

### Pre-configured Settings

The script is already configured with your details:
- **AWS Account ID:** 445875721173
- **EC2 Instance ID:** i-0c7f1f4e1cf54ee1d (`solocorn-server`)
- **Region:** us-east-2 (Ohio)
- **Domain:** solocorn.co

### What This Script Does

1. Verifies AWS credentials (Account: **445875721173**)
2. Checks your existing EC2 instance (`i-0c7f1f4e1cf54ee1d`)
3. Builds the Next.js application locally
4. Creates Docker Compose configuration
5. Asks for your SSH key and connects to the instance
6. Sets up Docker, Nginx, and SSL on the server
7. Starts all services

### Requirements for Existing Instance

- SSH access to the instance (port 22 open in security group)
- SSH private key file (e.g., `~/.ssh/solocorn-server.pem`)
- Instance must have internet access to pull Docker images

### Upgrading from t2.micro to t3.medium

Your existing `solocorn-server` is a t2.micro. To upgrade:

```bash
# Stop the instance
aws ec2 stop-instances --instance-ids i-0c7f1f4e1cf54ee1d --region us-east-2

# Wait for it to stop, then change instance type
aws ec2 modify-instance-attribute \
    --instance-id i-0c7f1f4e1cf54ee1d \
    --instance-type t3.medium

# Start the instance
aws ec2 start-instances --instance-ids i-0c7f1f4e1cf54ee1d --region us-east-2
```

## 🔍 Post-Deployment Verification

Check if everything is working:

```bash
# Check deployment info
cat .deployment-info

# Check application health
./check-status.sh

# View logs
./view-logs.sh

# SSH into server
./ssh-to-server.sh
```

### Manual Health Checks

```bash
# From your local machine
curl https://solocorn.co/api/health

# Check SSL certificate
curl -vI https://solocorn.co 2>&1 | grep "SSL certificate"

# Test WebSocket (Socket.io)
curl https://solocorn.co/api/socket/
```

## 🔄 Updating the Application

To deploy updates:

```bash
# Option 1: Using helper script
./update-app.sh

# Option 2: Manual
aws ssm start-session --target i-INSTANCE_ID --region us-east-2
cd /opt/tutorme
sudo git pull origin main
sudo docker-compose -f docker-compose.prod.yml up -d --build
sudo docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

## 🛠️ Troubleshooting

### Issue: "AWS credentials not configured!"

**Symptoms:** Script says AWS credentials are not configured.

**Solution:**

1. **Check if AWS CLI is installed:**
   ```bash
   aws --version
   # Should show something like: aws-cli/2.x.x
   ```

2. **Check if credentials are configured:**
   ```bash
   aws sts get-caller-identity
   ```
   - If it shows your account info, credentials are working
   - If it says "Unable to locate credentials", you need to configure

3. **Configure credentials:**
   ```bash
   aws configure
   # Enter your Access Key ID and Secret Access Key from Step 1.2
   ```

4. **Check credentials file location:**
   - Mac/Linux: `cat ~/.aws/credentials`
   - Windows: `type %UserProfile%\.aws\credentials`
   
   Should contain:
   ```
   [default]
   aws_access_key_id = AKIA...
   aws_secret_access_key = wJal...
   ```

### Issue: "Access Denied" or "Not Authorized"

**Symptoms:** You get permission errors when running the script.

**Solution:** Your AWS user needs more permissions.

1. Go to AWS Console → IAM → Users → [Your Username]
2. Click **"Add permissions"**
3. Select **"Attach existing policies directly"**
4. Add these policies:
   - `AmazonEC2FullAccess` - For creating EC2 instances
   - `AmazonRoute53FullAccess` - For DNS management
   - `AWSCloudFormationFullAccess` - For CDK deployments
   - `IAMFullAccess` - For creating IAM roles
5. Click **"Next"** → **"Add permissions"**

**Alternative:** If you can't add permissions, ask your AWS account administrator to add them for you.

### Issue: CDK deployment fails

```bash
# Check AWS credentials (should show Account: 445875721173)
aws sts get-caller-identity

# Bootstrap CDK manually
npx cdk bootstrap aws://445875721173/us-east-2

# Deploy with debug info
npx cdk deploy --debug
```

### Issue: Docker containers won't start

```bash
# Check logs
sudo docker-compose -f docker-compose.prod.yml logs

# Check disk space
df -h

# Restart containers
sudo docker-compose -f docker-compose.prod.yml restart
```

### Issue: SSL certificate error

```bash
# Check certbot logs
sudo cat /var/log/letsencrypt/letsencrypt.log

# Renew manually
sudo certbot renew --force-renewal

# Check Nginx config
sudo nginx -t
```

### Issue: Database connection failed

```bash
# Check if database is running
sudo docker-compose -f docker-compose.prod.yml ps

# Check database logs
sudo docker-compose -f docker-compose.prod.yml logs db

# Run migrations manually
sudo docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

## 🔐 Security Best Practices

### Protecting Your AWS Credentials

1. **Never commit credentials to Git:**
   ```bash
   # These files should be in .gitignore:
   ~/.aws/credentials
   ~/.aws/config
   .env.production
   ```

2. **Use IAM roles when possible:** Instead of access keys, use IAM roles for EC2 instances.

3. **Rotate credentials regularly:** Create new access keys every 90 days.

4. **Delete unused access keys:** If you lose a key, delete it and create a new one.

### To Delete/Rotate Access Keys:

1. AWS Console → IAM → Users → [Your Username] → Security credentials
2. Find the access key you want to delete
3. Click **"Actions"** → **"Delete"**
4. Create a new key if needed

## 🗑️ Cleanup / Destroy

To remove all AWS resources:

```bash
cd infrastructure
npx cdk destroy
```

⚠️ **Warning**: This will delete the EC2 instance and all data. Make sure to backup your database first!

## 📊 Architecture Diagram

### Option 1: New Infrastructure (CDK Deployment)
```
┌─────────────────────────────────────────────────────────────┐
│                         Users                               │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    Route 53 (DNS)                           │
│              solocorn.co → [Elastic IP]                     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              EC2 Instance (t3.medium)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Nginx (Reverse Proxy + SSL)                         │  │
│  │  Ports: 80, 443 → 3003                               │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                     │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │  Docker Compose                                      │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │  │
│  │  │   App   │  │   DB    │  │  Redis  │  │ Ollama  │ │  │
│  │  │ (3003)  │  │ (5432)  │  │ (6379)  │  │(11434)  │ │  │
│  │  │ Next.js │  │Postgres │  │  Cache  │  │   AI    │ │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Option 2: Existing EC2 (solocorn-server)
```
┌─────────────────────────────────────────────────────────────┐
│                         Users                               │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    Route 53 (DNS)                           │
│              solocorn.co → 54.255.98.14                     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         EC2 Instance: solocorn-server (t2.micro)           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Nginx (Reverse Proxy + SSL)                         │  │
│  │  Ports: 80, 443 → 3003                               │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                     │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │  Docker Compose (limited resources)                  │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │  │
│  │  │   App   │  │   DB    │  │  Redis  │  │ Ollama* │ │  │
│  │  │ (3003)  │  │ (5432)  │  │ (6379)  │  │(11434)  │ │  │
│  │  │ Next.js │  │Postgres │  │  Cache  │  │   AI    │ │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
* Ollama may need external AI provider on t2.micro due to limited RAM
```

## 🔐 Security Checklist

- [ ] Change default database password in `.env.production`
- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Add API keys for Kimi and Zhipu
- [ ] Configure security groups (only ports 80, 443, 22 open)
- [ ] Enable AWS CloudTrail for audit logging
- [ ] Set up automated backups for the database

## 📞 Support

If you encounter issues:

1. Check the logs: `sudo docker-compose -f docker-compose.prod.yml logs -f`
2. Verify environment variables: `cat /opt/tutorme/tutorme-app/.env.production`
3. Check AWS Console for resource status
4. Review this deployment guide

## 📝 Additional Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
