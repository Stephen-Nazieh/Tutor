# =============================================================================
# TutorMe AWS Deployment Script (PowerShell)
# =============================================================================
# Run this script in PowerShell as Administrator
# =============================================================================

# Configuration
$AWS_REGION = "us-east-2"
$DOMAIN_NAME = "solocorn.co"
$STACK_NAME = "InfrastructureStack"
$AWS_ACCOUNT_ID = "445875721173"

# Error handling
$ErrorActionPreference = "Stop"

function Write-Header($text) {
    Write-Host "`n========================================" -ForegroundColor Blue
    Write-Host $text -ForegroundColor Blue
    Write-Host "========================================`n" -ForegroundColor Blue
}

function Write-Success($text) {
    Write-Host "✓ $text" -ForegroundColor Green
}

function Write-Error($text) {
    Write-Host "✗ $text" -ForegroundColor Red
}

function Write-Warning($text) {
    Write-Host "⚠ $text" -ForegroundColor Yellow
}

function Write-Info($text) {
    Write-Host "ℹ $text" -ForegroundColor Cyan
}

# Check prerequisites
Write-Header "TutorMe AWS Deployment (PowerShell)"

Write-Info "Checking prerequisites..."

# Check AWS CLI
try {
    $ACCOUNT_ID = (aws sts get-caller-identity --query Account --output text) 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "AWS CLI not configured"
    }
    Write-Success "AWS CLI configured (Account: $ACCOUNT_ID)"
}
catch {
    Write-Error "AWS CLI not configured. Please run: aws configure"
    exit 1
}

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Success "Node.js found: $nodeVersion"
}
catch {
    Write-Error "Node.js not found. Please install Node.js"
    exit 1
}

# Check if in right directory
if (-not (Test-Path "infrastructure")) {
    Write-Error "infrastructure directory not found. Run from project root."
    exit 1
}

if (-not (Test-Path "tutorme-app")) {
    Write-Error "tutorme-app directory not found. Run from project root."
    exit 1
}

# Step 1: Setup environment
Write-Header "Step 1: Setting Up Environment"

Set-Location tutorme-app

if (-not (Test-Path ".env.production")) {
    Write-Info "Creating .env.production..."
    
    # Generate secrets
    $NEXTAUTH_SECRET = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object { [char]$_ })
    $DB_PASSWORD = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 16 | ForEach-Object { [char]$_ })
    
    @"
DATABASE_URL="postgresql://tutorme:${DB_PASSWORD}@db:5432/tutorme"
DIRECT_URL="postgresql://tutorme:${DB_PASSWORD}@db:5432/tutorme"
REDIS_URL="redis://redis:6379"
OLLAMA_URL="http://ollama:11434"
KIMI_API_KEY="your_kimi_api_key"
ZHIPU_API_KEY="your_zhipu_api_key"
NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"
NEXTAUTH_URL="https://${DOMAIN_NAME}"
NEXT_PUBLIC_APP_URL="https://${DOMAIN_NAME}"
NODE_ENV="production"
SECURITY_COMPRESS=true
SECURITY_ENCRYPT=true
SECURITY_AUDIT=true
SECURITY_RATE_LIMIT=300
"@ | Out-File -FilePath ".env.production" -Encoding UTF8
    
    Write-Success "Created .env.production"
    Write-Warning "Please edit .env.production and add your actual API keys!"
    Read-Host "Press Enter to continue after editing (or Ctrl+C to cancel)"
}
else {
    Write-Success ".env.production already exists"
}

# Create Dockerfile.production
if (-not (Test-Path "Dockerfile.production")) {
    Write-Info "Creating Dockerfile.production..."
    
    @'
FROM node:20-alpine AS base
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.bin/prisma ./node_modules/.bin/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
USER nextjs
EXPOSE 3003
ENV PORT 3003
ENV HOSTNAME "0.0.0.0"
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3003/api/health || exit 1
CMD ["node", "server.js"]
'@ | Out-File -FilePath "Dockerfile.production" -Encoding UTF8
    
    Write-Success "Created Dockerfile.production"
}

# Extract DB password from .env.production
$envContent = Get-Content ".env.production" -Raw
$DB_PASSWORD = if ($envContent -match 'tutorme:([^@]+)@') { $matches[1] } else { "changeme123" }

# Create docker-compose.prod.yml
$composeContent = @"
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
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: tutorme
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: tutorme
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - tutorme-network
    restart: unless-stopped
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    networks:
      - tutorme-network
    restart: unless-stopped
  ollama:
    image: ollama/ollama:latest
    volumes:
      - ollama_data:/root/.ollama
    networks:
      - tutorme-network
    restart: unless-stopped
volumes:
  postgres_data:
  redis_data:
  ollama_data:
networks:
  tutorme-network:
    driver: bridge
"@

$composeContent | Out-File -FilePath "docker-compose.prod.yml" -Encoding UTF8
Write-Success "Created docker-compose.prod.yml"

Set-Location ..

# Step 2: Deploy infrastructure
Write-Header "Step 2: Deploying Infrastructure"

Set-Location infrastructure

Write-Info "Installing dependencies..."
npm install

# Check if CDK is bootstrapped
$bootstrapExists = aws cloudformation describe-stacks --stack-name CDKToolkit --region $AWS_REGION 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Info "Bootstrapping CDK..."
    npx cdk bootstrap "aws://${ACCOUNT_ID}/${AWS_REGION}"
}
else {
    Write-Success "CDK already bootstrapped"
}

Write-Info "Deploying stack (this may take 5-10 minutes)..."
npx cdk deploy --require-approval never

# Get outputs
Write-Info "Getting deployment outputs..."
$INSTANCE_ID = (aws cloudformation describe-stacks --stack-name $STACK_NAME --region $AWS_REGION --query 'Stacks[0].Outputs[?OutputKey==`TutormeAppInstanceId`].OutputValue' --output text)
$ELASTIC_IP = (aws cloudformation describe-stacks --stack-name $STACK_NAME --region $AWS_REGION --query 'Stacks[0].Outputs[?OutputKey==`TutormeAppInstanceId`].OutputValue' --output text)

Set-Location ..

# Save deployment info
@"
INSTANCE_ID=${INSTANCE_ID}
ELASTIC_IP=${ELASTIC_IP}
AWS_REGION=${AWS_REGION}
DOMAIN_NAME=${DOMAIN_NAME}
"@ | Out-File -FilePath ".deployment-info" -Encoding UTF8

Write-Header "Deployment Complete!"
Write-Success "Infrastructure deployed successfully!"
Write-Info "Instance ID: $INSTANCE_ID"
Write-Info "Elastic IP: $ELASTIC_IP"
Write-Info ""
Write-Warning "IMPORTANT: Next Steps"
Write-Info "1. Update DNS in Route 53:"
Write-Info "   - A record: ${DOMAIN_NAME} → ${ELASTIC_IP}"
Write-Info "   - A record: www.${DOMAIN_NAME} → ${ELASTIC_IP}"
Write-Info ""
Write-Info "2. Wait for instance ready:"
Write-Info "   aws ec2 wait instance-status-ok --instance-ids ${INSTANCE_ID} --region ${AWS_REGION}"
Write-Info ""
Write-Info "3. Connect and deploy:"
Write-Info "   aws ssm start-session --target ${INSTANCE_ID} --region ${AWS_REGION}"
Write-Info ""
Write-Info "Deployment info saved to .deployment-info"
