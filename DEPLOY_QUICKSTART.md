# 🚀 TutorMe AWS Deployment - Quick Start

## ⚡ Fastest Way to Deploy (3 Steps)

### Step 1: Run the Deployment Script

**Option A: Create New Infrastructure (Recommended for Production)**
```bash
# Creates new t3.medium EC2 instance with Elastic IP
./deploy.sh
```

**Option B: Use Existing EC2 Instance (Faster)**
```bash
# Deploys to your existing 'solocorn-server' (t2.micro)
./deploy-existing.sh
```

**Option C: Windows (PowerShell as Admin)**
```powershell
.\deploy.ps1
```

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

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `deploy.sh` | Full automated deployment | **Recommended for first deploy** |
| `deploy-existing.sh` | Deploy to existing EC2 | Use your current `solocorn-server` |
| `deploy-simple.sh` | Infra only + manual steps | If you want more control |
| `deploy.ps1` | Windows PowerShell version | Windows users |
| `check-status.sh` | Check deployment status | After deployment |
| `view-logs.sh` | View application logs | Debugging |
| `ssh-to-server.sh` | SSH into EC2 | Server management |
| `update-app.sh` | Update application | After code changes |

### Files Created in `tutorme-app/`

- `.env.production` - Production environment variables
- `Dockerfile.production` - Docker image definition
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

## ✅ Post-Deployment Checklist

- [ ] App loads at https://solocorn.co
- [ ] SSL certificate is valid (green lock)
- [ ] API keys added to .env.production
- [ ] Database migrations ran successfully
- [ ] Ollama model downloaded
- [ ] WebSocket connections working
- [ ] Test user registration/login

**You're all set! 🎉**
