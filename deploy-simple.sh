#!/bin/bash

# =============================================================================
# TutorMe Simple Deployment Script
# =============================================================================
# This is a simplified version that gives you more control over each step
# =============================================================================

set -e

# Configuration
AWS_REGION="us-east-2"
DOMAIN_NAME="solocorn.co"
STACK_NAME="InfrastructureStack"
AWS_ACCOUNT_ID="445875721173"

echo "========================================"
echo "TutorMe AWS Deployment (Simple Mode)"
echo "========================================"
echo ""

# Step 1: Check AWS CLI
echo "Step 1: Checking AWS CLI..."
if ! aws sts get-caller-identity >/dev/null 2>&1; then
    echo "❌ AWS CLI not configured. Please run: aws configure"
    exit 1
fi
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "✓ AWS Account: $ACCOUNT_ID"
echo ""

# Step 2: Setup environment
echo "Step 2: Setting up environment..."
cd tutorme-app

if [ ! -f ".env.production" ]; then
    echo "Creating .env.production..."
    
    # Generate secrets
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    DB_PASSWORD=$(openssl rand -base64 16 | tr -dc 'a-zA-Z0-9' | head -c 16)
    
    cat > .env.production << EOF
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
EOF
    echo "✓ Created .env.production"
    echo "⚠️  Please edit .env.production and add your actual API keys!"
else
    echo "✓ .env.production already exists"
fi

# Create Dockerfile.production if not exists
if [ ! -f "Dockerfile.production" ]; then
    echo "Creating Dockerfile.production..."
    cat > Dockerfile.production << 'EOF'
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
EOF
    echo "✓ Created Dockerfile.production"
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
EOF
echo "✓ Created docker-compose.prod.yml"
cd ..

echo ""
echo "Step 3: Deploying infrastructure..."
cd infrastructure
npm install

# Check if already bootstrapped
if ! aws cloudformation describe-stacks --stack-name CDKToolkit --region $AWS_REGION >/dev/null 2>&1; then
    echo "Bootstrapping CDK..."
    npx cdk bootstrap "aws://${ACCOUNT_ID}/${AWS_REGION}"
else
    echo "✓ CDK already bootstrapped"
fi

echo "Deploying stack (this may take 5-10 minutes)..."
npx cdk deploy --require-approval never

# Get outputs
INSTANCE_ID=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $AWS_REGION --query 'Stacks[0].Outputs[?OutputKey==`TutormeAppInstanceId`].OutputValue' --output text)
ELASTIC_IP=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $AWS_REGION --query 'Stacks[0].Outputs[?OutputKey==`TutormeAppPublicIP`].OutputValue' --output text)

cd ..

echo ""
echo "========================================"
echo "Infrastructure Deployed!"
echo "========================================"
echo "Instance ID: $INSTANCE_ID"
echo "Elastic IP: $ELASTIC_IP"
echo ""
echo "Step 4: Next Steps (Manual)"
echo "========================================"
echo ""
echo "1. Update DNS in Route 53:"
echo "   - Create A record for ${DOMAIN_NAME} → ${ELASTIC_IP}"
echo "   - Create A record for www.${DOMAIN_NAME} → ${ELASTIC_IP}"
echo ""
echo "2. Wait for instance to be ready (~2 minutes):"
echo "   aws ec2 wait instance-status-ok --instance-ids ${INSTANCE_ID} --region ${AWS_REGION}"
echo ""
echo "3. Connect to the server:"
echo "   aws ssm start-session --target ${INSTANCE_ID} --region ${AWS_REGION}"
echo ""
echo "4. On the server, run:"
echo "   sudo mkdir -p /opt/tutorme"
echo "   # Copy your project files to /opt/tutorme"
echo "   cd /opt/tutorme/tutorme-app"
echo "   sudo docker-compose -f docker-compose.prod.yml up -d --build"
echo "   sudo docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy"
echo ""
echo "5. Configure SSL:"
echo "   sudo certbot --nginx -d ${DOMAIN_NAME} -d www.${DOMAIN_NAME}"
echo ""
echo "6. Pull Ollama model:"
echo "   sudo docker-compose -f docker-compose.prod.yml exec ollama ollama pull llama3.1"
echo ""

# Save deployment info
cat > .deployment-info << EOF
INSTANCE_ID=${INSTANCE_ID}
ELASTIC_IP=${ELASTIC_IP}
AWS_REGION=${AWS_REGION}
DOMAIN_NAME=${DOMAIN_NAME}
EOF

echo "✓ Deployment info saved to .deployment-info"
echo ""
