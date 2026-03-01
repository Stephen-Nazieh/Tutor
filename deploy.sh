#!/bin/bash

# =============================================================================
# TutorMe AWS Deployment Script
# =============================================================================
# This script automates the deployment of TutorMe to AWS using CDK and Docker
# 
# Prerequisites:
# - AWS CLI installed and configured (aws configure)
# - Docker installed locally (for building images)
# - Domain solocorn.co registered in Route 53
#
# Usage: ./deploy.sh
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION="us-east-2"
DOMAIN_NAME="solocorn.co"
STACK_NAME="InfrastructureStack"
PROJECT_NAME="tutorme"
AWS_ACCOUNT_ID="445875721173"
REPO_URL="https://github.com/solocorn/tutorme.git"

# Print functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_header "Step 1: Checking Prerequisites"
    
    local missing=()
    
    if ! command_exists aws; then
        missing+=("aws-cli")
    fi
    
    if ! command_exists docker; then
        missing+=("docker")
    fi
    
    if ! command_exists node; then
        missing+=("node")
    fi
    
    if ! command_exists npm; then
        missing+=("npm")
    fi
    
    if [ ${#missing[@]} -ne 0 ]; then
        print_error "Missing prerequisites: ${missing[*]}"
        print_info "Please install the missing tools and try again"
        exit 1
    fi
    
    # Check AWS credentials
    print_info "Checking AWS credentials..."
    if ! aws sts get-caller-identity >/dev/null 2>&1; then
        print_error "AWS credentials not configured or invalid"
        print_info "Please run: aws configure"
        exit 1
    fi
    
    ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    print_success "AWS credentials valid (Account: $ACCOUNT_ID)"
    
    # Check if we're in the right directory
    if [ ! -d "infrastructure" ]; then
        print_error "infrastructure directory not found"
        print_info "Please run this script from the project root"
        exit 1
    fi
    
    if [ ! -d "tutorme-app" ]; then
        print_error "tutorme-app directory not found"
        print_info "Please run this script from the project root"
        exit 1
    fi
    
    print_success "All prerequisites satisfied"
}

# Get or create .env.production
setup_environment() {
    print_header "Step 2: Setting Up Environment Variables"
    
    cd tutorme-app
    
    if [ -f ".env.production" ]; then
        print_warning ".env.production already exists"
        read -p "Do you want to use the existing file? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            create_env_file
        fi
    else
        create_env_file
    fi
    
    cd ..
    print_success "Environment file ready"
}

# Create .env.production file
create_env_file() {
    print_info "Creating .env.production file..."
    
    # Generate random secrets
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    DB_PASSWORD=$(openssl rand -base64 16 | tr -dc 'a-zA-Z0-9' | head -c 16)
    
    cat > .env.production << EOF
# =============================================================================
# Database Configuration (Docker Compose)
# =============================================================================
DATABASE_URL="postgresql://tutorme:${DB_PASSWORD}@db:5432/tutorme"
DIRECT_URL="postgresql://tutorme:${DB_PASSWORD}@db:5432/tutorme"

# =============================================================================
# Redis (Docker Compose)
# =============================================================================
REDIS_URL="redis://redis:6379"

# =============================================================================
# AI Providers
# =============================================================================
OLLAMA_URL="http://ollama:11434"
KIMI_API_KEY="your_kimi_api_key_here"
ZHIPU_API_KEY="your_zhipu_api_key_here"

# =============================================================================
# Authentication
# =============================================================================
NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"
NEXTAUTH_URL="https://${DOMAIN_NAME}"

# =============================================================================
# Application Settings
# =============================================================================
NEXT_PUBLIC_APP_URL="https://${DOMAIN_NAME}"
NODE_ENV="production"

# =============================================================================
# Security
# =============================================================================
SECURITY_COMPRESS=true
SECURITY_ENCRYPT=true
SECURITY_AUDIT=true
SECURITY_RATE_LIMIT=300
SECURITY_MAX_REQUESTS_PER_MINUTE=1000
EOF
    
    print_warning "Please edit .env.production and add your actual API keys"
    read -p "Press Enter to continue after editing (or Ctrl+C to cancel)..."
}

# Create Dockerfile.production
create_dockerfile() {
    print_header "Step 3: Creating Dockerfile"
    
    cd tutorme-app
    
    if [ -f "Dockerfile.production" ]; then
        print_warning "Dockerfile.production already exists"
    else
        cat > Dockerfile.production << 'EOF'
# Multi-stage build for production
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma files for migrations
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.bin/prisma ./node_modules/.bin/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3003

ENV PORT 3003
ENV HOSTNAME "0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3003/api/health || exit 1

CMD ["node", "server.js"]
EOF
        print_success "Dockerfile.production created"
    fi
    
    # Create docker-compose.prod.yml
    DB_PASSWORD=$(grep DATABASE_URL .env.production | grep -o 'tutorme:[^@]*' | cut -d: -f2)
    
    cat > docker-compose.prod.yml << EOF
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.production
    ports:
      - "3003:3003"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    depends_on:
      - db
      - redis
    networks:
      - tutorme-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3003/api/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: tutorme
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: tutorme
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - tutorme-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U tutorme"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - tutorme-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  ollama:
    image: ollama/ollama:latest
    volumes:
      - ollama_data:/root/.ollama
    ports:
      - "11434:11434"
    networks:
      - tutorme-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:11434/api/tags"]
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  postgres_data:
  redis_data:
  ollama_data:

networks:
  tutorme-network:
    driver: bridge
EOF
    
    print_success "docker-compose.prod.yml created"
    cd ..
}

# Deploy CDK infrastructure
deploy_infrastructure() {
    print_header "Step 4: Deploying Infrastructure (CDK)"
    
    cd infrastructure
    
    print_info "Installing CDK dependencies..."
    npm install
    
    print_info "Bootstrapping CDK..."
    npx cdk bootstrap "aws://${ACCOUNT_ID}/${AWS_REGION}" || true
    
    print_info "Deploying stack to ${AWS_REGION}..."
    # Clear cached context and deploy to correct region
    rm -f cdk.context.json
    npx cdk deploy --require-approval never --region ${AWS_REGION}
    
    # Get outputs
    print_info "Getting deployment outputs..."
    INSTANCE_ID=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --region ${AWS_REGION} --query 'Stacks[0].Outputs[?OutputKey==`TutormeAppInstanceId`].OutputValue' --output text)
    ELASTIC_IP=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --region ${AWS_REGION} --query 'Stacks[0].Outputs[?OutputKey==`TutormeAppPublicIP`].OutputValue' --output text)
    
    cd ..
    
    print_success "Infrastructure deployed successfully"
    print_info "Elastic IP: $ELASTIC_IP"
    print_info "Instance ID: $INSTANCE_ID"
    
    # Save to file for later use
    cat > .deployment-info << EOF
INSTANCE_ID=${INSTANCE_ID}
ELASTIC_IP=${ELASTIC_IP}
AWS_REGION=${AWS_REGION}
DOMAIN_NAME=${DOMAIN_NAME}
EOF
}

# Update Route 53 DNS
update_dns() {
    print_header "Step 5: Updating DNS (Route 53)"
    
    source .deployment-info
    
    print_info "Current DNS records for ${DOMAIN_NAME}:"
    aws route53 list-resource-record-sets --hosted-zone-id $(aws route53 list-hosted-zones-by-name --dns-name ${DOMAIN_NAME} --query 'HostedZones[0].Id' --output text | cut -d'/' -f3) --query 'ResourceRecordSets[?Name==`'${DOMAIN_NAME}'.` || Name==`www.'${DOMAIN_NAME}'.`]' --output table || true
    
    print_warning "Please update your DNS A records to point to: ${ELASTIC_IP}"
    print_info "Required records:"
    print_info "  - ${DOMAIN_NAME} A ${ELASTIC_IP}"
    print_info "  - www.${DOMAIN_NAME} A ${ELASTIC_IP}"
    
    read -p "Have you updated the DNS records? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "Please update DNS records and run the script again"
        exit 0
    fi
    
    print_success "DNS configuration acknowledged"
}

# Wait for instance to be ready
wait_for_instance() {
    print_header "Step 6: Waiting for EC2 Instance"
    
    source .deployment-info
    
    print_info "Waiting for instance ${INSTANCE_ID} to be running..."
    aws ec2 wait instance-running --instance-ids ${INSTANCE_ID} --region ${AWS_REGION}
    
    print_info "Waiting for instance status checks to pass..."
    aws ec2 wait instance-status-ok --instance-ids ${INSTANCE_ID} --region ${AWS_REGION}
    
    # Wait a bit more for user data to complete
    print_info "Waiting for instance setup to complete (2 minutes)..."
    sleep 120
    
    print_success "Instance is ready"
}

# Deploy application to EC2
deploy_application() {
    print_header "Step 7: Deploying Application to EC2"
    
    source .deployment-info
    
    # Create deployment script for EC2
    cat > deploy-to-ec2.sh << 'ECF'
#!/bin/bash
set -e

PROJECT_DIR="/opt/tutorme"
DOMAIN_NAME="solocorn.co"

echo "========================================"
echo "Deploying TutorMe Application"
echo "========================================"

# Install Git if not present
if ! command -v git &> /dev/null; then
    echo "Installing Git..."
    sudo dnf install git -y
fi

# Clone or update repository
if [ -d "$PROJECT_DIR" ]; then
    echo "Updating existing repository..."
    cd $PROJECT_DIR
    sudo git pull origin main || true
else
    echo "Cloning repository..."
    sudo mkdir -p /opt
    cd /opt
    sudo git clone https://github.com/solocorn/tutorme.git tutorme || {
        echo "Using local files instead..."
        sudo mkdir -p $PROJECT_DIR
    }
fi

# Change to project directory
cd $PROJECT_DIR/tutorme-app || cd $PROJECT_DIR

echo "Setting up environment..."
# Environment file should be already in place from SCP

# Build and start Docker containers
echo "Building and starting Docker containers..."
sudo docker-compose -f docker-compose.prod.yml down || true
sudo docker-compose -f docker-compose.prod.yml build --no-cache
sudo docker-compose -f docker-compose.prod.yml up -d

# Wait for database to be ready
echo "Waiting for database..."
sleep 10

# Run migrations
echo "Running database migrations..."
sudo docker-compose -f docker-compose.prod.yml exec -T app npx prisma migrate deploy || true

# Optional: Seed database
# sudo docker-compose -f docker-compose.prod.yml exec -T app npm run db:seed || true

# Configure Nginx
echo "Configuring Nginx..."
sudo tee /etc/nginx/conf.d/solocorn.conf << 'NGINX'
server {
    listen 80;
    server_name solocorn.co www.solocorn.co;

    location / {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/socket {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }
}
NGINX

# Test and reload Nginx
sudo nginx -t && sudo systemctl reload nginx

# Setup SSL with Certbot
echo "Setting up SSL certificate..."
sudo certbot --nginx -d solocorn.co -d www.solocorn.co --non-interactive --agree-tos --email admin@solocorn.co || {
    echo "Certbot failed. DNS might not have propagated yet."
    echo "Run manually later: sudo certbot --nginx -d solocorn.co -d www.solocorn.co"
}

# Pull Ollama model
echo "Pulling Ollama model (this may take a while)..."
sudo docker-compose -f docker-compose.prod.yml exec -T ollama ollama pull llama3.1 || {
    echo "Failed to pull model. You can do this manually later."
}

echo "========================================"
echo "Deployment Complete!"
echo "========================================"
echo "App URL: https://${DOMAIN_NAME}"
echo ""
echo "Useful commands:"
echo "  View logs: sudo docker-compose -f docker-compose.prod.yml logs -f app"
echo "  Restart: sudo docker-compose -f docker-compose.prod.yml restart"
echo "  Update: cd ${PROJECT_DIR} && sudo git pull && sudo docker-compose -f docker-compose.prod.yml up -d --build"
ECF

    chmod +x deploy-to-ec2.sh
    
    # Create remote setup script
    cat > setup-remote.sh << REMOTE
#!/bin/bash
set -e

echo "Setting up EC2 instance..."

# Create project directory
sudo mkdir -p /opt/tutorme
sudo chown -R ec2-user:ec2-user /opt/tutorme

# Copy files
REMOTE

    # Copy files to EC2
    print_info "Copying files to EC2 instance..."
    
    # First, copy the deployment script
    aws ssm send-command \
        --instance-ids ${INSTANCE_ID} \
        --document-name "AWS-RunShellScript" \
        --parameters "commands=[
            \"mkdir -p /opt/tutorme\",
            \"chown -R ec2-user:ec2-user /opt/tutorme\"
        ]" \
        --region ${AWS_REGION} \
        --comment "Create project directory"
    
    # Use SCP to copy files (need to wait for SSH to be ready)
    print_info "Waiting for SSH to be available..."
    sleep 30
    
    # Try SSM file transfer instead
    print_info "Transferring application files..."
    
    # Create a tar archive of necessary files
    cd tutorme-app
    tar -czf ../deploy.tar.gz \
        --exclude='node_modules' \
        --exclude='.next' \
        --exclude='*.log' \
        . 2>/dev/null || true
    cd ..
    
    # Transfer via S3 (more reliable)
    S3_BUCKET="tutorme-deploy-${ACCOUNT_ID}"
    aws s3 mb s3://${S3_BUCKET} --region ${AWS_REGION} 2>/dev/null || true
    aws s3 cp deploy.tar.gz s3://${S3_BUCKET}/deploy.tar.gz --region ${AWS_REGION}
    
    # Download and extract on EC2
    aws ssm send-command \
        --instance-ids ${INSTANCE_ID} \
        --document-name "AWS-RunShellScript" \
        --parameters "commands=[
            \"aws s3 cp s3://${S3_BUCKET}/deploy.tar.gz /tmp/deploy.tar.gz --region ${AWS_REGION}\",
            \"cd /opt/tutorme && tar -xzf /tmp/deploy.tar.gz\",
            \"rm /tmp/deploy.tar.gz\"
        ]" \
        --region ${AWS_REGION} \
        --comment "Download and extract application"
    
    print_success "Files transferred to EC2"
    
    # Run deployment script on EC2
    print_info "Running deployment on EC2..."
    aws ssm send-command \
        --instance-ids ${INSTANCE_ID} \
        --document-name "AWS-RunShellScript" \
        --parameters "commands=[
            \"cd /opt/tutorme && bash deploy-to-ec2.sh 2>&1 | tee /var/log/tutorme-deploy.log\"
        ]" \
        --region ${AWS_REGION} \
        --comment "Deploy TutorMe application"
    
    print_success "Deployment initiated on EC2"
    print_info "Check deployment logs: aws ssm get-command-invocation --command-id <command-id> --instance-id ${INSTANCE_ID}"
}

# Main execution
main() {
    print_header "TutorMe AWS Deployment Script"
    print_info "Target Domain: ${DOMAIN_NAME}"
    print_info "AWS Region: ${AWS_REGION}"
    print_info "Account ID: ${ACCOUNT_ID:-Not determined}"
    
    check_prerequisites
    setup_environment
    create_dockerfile
    deploy_infrastructure
    update_dns
    wait_for_instance
    deploy_application
    
    print_header "Deployment Summary"
    print_success "Infrastructure deployed successfully!"
    print_info "Elastic IP: ${ELASTIC_IP}"
    print_info "Instance ID: ${INSTANCE_ID}"
    print_info "App URL: https://${DOMAIN_NAME}"
    
    echo -e "\n${GREEN}Next steps:${NC}"
    echo "1. DNS propagation may take 5-60 minutes"
    echo "2. Check deployment status: ./check-status.sh"
    echo "3. View logs: ./view-logs.sh"
    echo "4. SSH into server: ./ssh-to-server.sh"
    
    # Create helper scripts
    create_helper_scripts
}

# Create helper scripts
create_helper_scripts() {
    source .deployment-info 2>/dev/null || true
    
    # Check status script
    cat > check-status.sh << EOF
#!/bin/bash
source .deployment-info 2>/dev/null || { echo "No deployment info found"; exit 1; }

echo "Checking deployment status..."
echo "Instance ID: \${INSTANCE_ID}"
echo "Elastic IP: \${ELASTIC_IP}"

# Check instance status
aws ec2 describe-instance-status --instance-ids \${INSTANCE_ID} --region \${AWS_REGION} --output table

# Check app health
echo -e "\nApp Health Check:"
curl -s -o /dev/null -w "%{http_code}" https://\${DOMAIN_NAME}/api/health 2>/dev/null || echo "App not responding (may still be starting)"

echo -e "\nRecent deployment logs:"
aws ssm send-command \\
    --instance-ids \${INSTANCE_ID} \\
    --document-name "AWS-RunShellScript" \\
    --parameters 'commands=["tail -50 /var/log/tutorme-deploy.log"]' \\
    --region \${AWS_REGION} \\
    --output text \\
    --query 'Command.CommandId' 2>/dev/null || echo "Unable to fetch logs"
EOF
    chmod +x check-status.sh
    
    # View logs script
    cat > view-logs.sh << EOF
#!/bin/bash
source .deployment-info 2>/dev/null || { echo "No deployment info found"; exit 1; }

aws ssm send-command \\
    --instance-ids \${INSTANCE_ID} \\
    --document-name "AWS-RunShellScript" \\
    --parameters 'commands=["cd /opt/tutorme && sudo docker-compose -f docker-compose.prod.yml logs -f --tail=100"]' \\
    --region \${AWS_REGION}
EOF
    chmod +x view-logs.sh
    
    # SSH script
    cat > ssh-to-server.sh << EOF
#!/bin/bash
source .deployment-info 2>/dev/null || { echo "No deployment info found"; exit 1; }

echo "Connecting to instance \${INSTANCE_ID} via SSM..."
aws ssm start-session --target \${INSTANCE_ID} --region \${AWS_REGION}
EOF
    chmod +x ssh-to-server.sh
    
    # Update script
    cat > update-app.sh << EOF
#!/bin/bash
source .deployment-info 2>/dev/null || { echo "No deployment info found"; exit 1; }

echo "Updating application..."

aws ssm send-command \\
    --instance-ids \${INSTANCE_ID} \\
    --document-name "AWS-RunShellScript" \\
    --parameters 'commands=[
        "cd /opt/tutorme && sudo git pull origin main",
        "cd /opt/tutorme && sudo docker-compose -f docker-compose.prod.yml up -d --build",
        "cd /opt/tutorme && sudo docker-compose -f docker-compose.prod.yml exec -T app npx prisma migrate deploy"
    ]' \\
    --region \${AWS_REGION}

echo "Update initiated. Check status with ./check-status.sh"
EOF
    chmod +x update-app.sh
    
    print_success "Helper scripts created:"
    print_info "  - check-status.sh: Check deployment status"
    print_info "  - view-logs.sh: View application logs"
    print_info "  - ssh-to-server.sh: SSH into the server"
    print_info "  - update-app.sh: Update the application"
}

# Run main function
main "$@"
