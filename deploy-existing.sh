#!/bin/bash

# =============================================================================
# TutorMe Deployment to EXISTING EC2 Instance
# =============================================================================
# Use this script if you already have an EC2 instance running
# =============================================================================

set -e

# Configuration
AWS_REGION="us-east-2"
DOMAIN_NAME="solocorn.co"
AWS_ACCOUNT_ID="445875721173"
INSTANCE_ID="i-0c7f1f4e1cf54ee1d"  # Your solocorn-server instance
EXISTING_INSTANCE_NAME="solocorn-server"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

function header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

function success() {
    echo -e "${GREEN}✓ $1${NC}"
}

function warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

function error() {
    echo -e "${RED}✗ $1${NC}"
}

# =============================================================================
# STEP 1: Verify AWS credentials
# =============================================================================
header "Step 1: Verifying AWS Credentials"

if ! aws sts get-caller-identity &>/dev/null; then
    error "AWS credentials not configured!"
    echo "Please run: aws configure"
    echo "  AWS Access Key ID: [your key]"
    echo "  AWS Secret Access Key: [your secret]"
    echo "  Default region name: us-east-2"
    exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
success "AWS credentials valid (Account: $ACCOUNT_ID)"

if [ "$ACCOUNT_ID" != "$AWS_ACCOUNT_ID" ]; then
    warning "Account ID mismatch! Expected: $AWS_ACCOUNT_ID, Got: $ACCOUNT_ID"
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# =============================================================================
# STEP 2: Verify existing instance
# =============================================================================
header "Step 2: Verifying Existing EC2 Instance"

echo "Checking instance $INSTANCE_ID..."
INSTANCE_STATE=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query 'Reservations[0].Instances[0].State.Name' \
    --output text \
    --region "$AWS_REGION" 2>/dev/null)

if [ "$INSTANCE_STATE" != "running" ]; then
    error "Instance is not running! Current state: $INSTANCE_STATE"
    exit 1
fi

INSTANCE_IP=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query 'Reservations[0].Instances[0].PublicIpAddress' \
    --output text \
    --region "$AWS_REGION")

INSTANCE_TYPE=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query 'Reservations[0].Instances[0].InstanceType' \
    --output text \
    --region "$AWS_REGION")

success "Found instance: $EXISTING_INSTANCE_NAME ($INSTANCE_TYPE)"
success "Public IP: $INSTANCE_IP"
echo ""
echo "Make sure your domain $DOMAIN_NAME points to this IP:"
echo "  $INSTANCE_IP"
echo ""

# =============================================================================
# STEP 3: Prepare application
# =============================================================================
header "Step 3: Preparing Application"

cd tutorme-app

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    warning "node_modules not found. Installing dependencies..."
    npm install
fi

# Build the application
echo "Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    error "Build failed! Please fix the errors above."
    exit 1
fi

success "Build completed successfully"

# =============================================================================
# STEP 4: Create environment file
# =============================================================================
header "Step 4: Creating Production Environment File"

if [ ! -f ".env.production" ]; then
    echo "Creating .env.production from template..."
    cat > .env.production << 'EOF'
# =============================================================================
# TutorMe Production Environment Configuration
# =============================================================================

# -----------------------------------------------------------------------------
# Application
# -----------------------------------------------------------------------------
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://solocorn.co
PORT=3003

# -----------------------------------------------------------------------------
# Database (PostgreSQL via Docker Compose)
# -----------------------------------------------------------------------------
DATABASE_URL=postgresql://postgres:postgres_password@db:5432/tutorme
DATABASE_POOL_URL=postgresql://postgres:postgres_password@db:5432/tutorme

# -----------------------------------------------------------------------------
# Redis
# -----------------------------------------------------------------------------
REDIS_URL=redis://redis:6379

# -----------------------------------------------------------------------------
# Authentication (Generate new secrets!)
# -----------------------------------------------------------------------------
NEXTAUTH_SECRET=change_this_to_a_random_32_char_string
NEXTAUTH_URL=https://solocorn.co

# -----------------------------------------------------------------------------
# AI Providers (Add your production keys)
# -----------------------------------------------------------------------------
OLLAMA_URL=http://ollama:11434
# KIMI_API_KEY=your_kimi_api_key_here
# ZHIPU_API_KEY=your_zhipu_api_key_here

# -----------------------------------------------------------------------------
# Video (Daily.co)
# -----------------------------------------------------------------------------
# DAILY_API_KEY=your_daily_api_key_here

# -----------------------------------------------------------------------------
# Payments (Add production keys)
# -----------------------------------------------------------------------------
# AIRWALLEX_CLIENT_ID=your_client_id
# AIRWALLEX_API_KEY=your_api_key
# AIRWALLEX_ENV=production

# HITPAY_API_KEY=your_api_key
# HITPAY_SALT=your_salt
# HITPAY_ENV=production

# -----------------------------------------------------------------------------
# Sentry (Optional)
# -----------------------------------------------------------------------------
# SENTRY_DSN=your_sentry_dsn
# NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# -----------------------------------------------------------------------------
# Monitoring
# -----------------------------------------------------------------------------
ENABLE_METRICS=true
LOG_LEVEL=info
EOF
    success ".env.production created"
    warning "Please edit .env.production and add your production secrets!"
    echo ""
    echo "Required secrets to add:"
    echo "  - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
    echo "  - KIMI_API_KEY (optional but recommended)"
    echo "  - DAILY_API_KEY (for video calls)"
    echo "  - Payment gateway keys"
    echo ""
    read -p "Press Enter to continue after editing .env.production..."
else
    success ".env.production already exists"
fi

# =============================================================================
# STEP 5: Create deployment package
# =============================================================================
header "Step 5: Creating Deployment Package"

# Create deployment directory
DEPLOY_DIR="../deploy-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copy necessary files
cp -r .next "$DEPLOY_DIR/"
cp -r public "$DEPLOY_DIR/" 2>/dev/null || true
cp package*.json "$DEPLOY_DIR/"
cp .env.production "$DEPLOY_DIR/"

# Create docker-compose.prod.yml
cat > "$DEPLOY_DIR/docker-compose.prod.yml" << 'EOF'
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: tutorme-app
    restart: always
    ports:
      - "3003:3003"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    depends_on:
      - db
      - redis
      - ollama
    networks:
      - tutorme-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3003/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:16-alpine
    container_name: tutorme-db
    restart: always
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres_password
      POSTGRES_DB: tutorme
    networks:
      - tutorme-network

  redis:
    image: redis:7-alpine
    container_name: tutorme-redis
    restart: always
    volumes:
      - redis_data:/data
    networks:
      - tutorme-network

  ollama:
    image: ollama/ollama:latest
    container_name: tutorme-ollama
    restart: always
    volumes:
      - ollama_data:/root/.ollama
    networks:
      - tutorme-network
    # GPU support (optional)
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - driver: nvidia
    #           count: 1
    #           capabilities: [gpu]

volumes:
  postgres_data:
  redis_data:
  ollama_data:

networks:
  tutorme-network:
    driver: bridge
EOF

# Create minimal Dockerfile
cat > "$DEPLOY_DIR/Dockerfile" << 'EOF'
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy built application
COPY .next ./.next
COPY public ./public
COPY .env.production ./

# Expose port
EXPOSE 3003

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3003/api/health || exit 1

# Start the application
CMD ["npm", "start"]
EOF

# Create a setup script for the server
cat > "$DEPLOY_DIR/setup-server.sh" << 'EOF'
#!/bin/bash
set -e

echo "Setting up TutorMe on server..."

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    sudo yum update -y
    sudo yum install -y docker
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker ec2-user
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Install Nginx
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    sudo yum install -y nginx
fi

# Start services
sudo systemctl start nginx
sudo systemctl enable nginx

echo "Server setup complete!"
EOF

chmod +x "$DEPLOY_DIR/setup-server.sh"

success "Deployment package created: $DEPLOY_DIR"

# =============================================================================
# STEP 6: Deploy to EC2
# =============================================================================
header "Step 6: Deploying to EC2 Instance ($INSTANCE_IP)"

echo "This will deploy to your existing EC2 instance."
echo "You'll need to provide the SSH key for the instance."
echo ""
echo "Typical SSH key location: ~/.ssh/solocorn-server.pem or ~/.ssh/id_rsa"
echo ""
read -p "Enter path to your SSH private key: " SSH_KEY_PATH
read -p "Enter SSH username [ec2-user]: " SSH_USER
SSH_USER=${SSH_USER:-ec2-user}

if [ ! -f "$SSH_KEY_PATH" ]; then
    error "SSH key not found: $SSH_KEY_PATH"
    exit 1
fi

chmod 600 "$SSH_KEY_PATH"

# Test SSH connection
echo "Testing SSH connection..."
if ! ssh -i "$SSH_KEY_PATH" -o ConnectTimeout=5 -o StrictHostKeyChecking=no "$SSH_USER@$INSTANCE_IP" "echo 'SSH OK'" 2>/dev/null; then
    error "Cannot connect to instance via SSH"
    echo "Please check:"
    echo "  1. SSH key is correct"
    echo "  2. Security group allows port 22"
    echo "  3. Instance is running"
    exit 1
fi
success "SSH connection successful"

# Setup server
echo "Setting up server..."
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$DEPLOY_DIR/setup-server.sh" "$SSH_USER@$INSTANCE_IP:/tmp/"
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$SSH_USER@$INSTANCE_IP" "bash /tmp/setup-server.sh"

# Copy deployment files
echo "Copying deployment files..."
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$SSH_USER@$INSTANCE_IP" "mkdir -p /home/$SSH_USER/tutorme"
scp -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no -r "$DEPLOY_DIR"/* "$SSH_USER@$INSTANCE_IP:/home/$SSH_USER/tutorme/"

# Deploy
echo "Starting services..."
ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no "$SSH_USER@$INSTANCE_IP" "cd /home/$SSH_USER/tutorme && sudo docker-compose -f docker-compose.prod.yml down 2>/dev/null || true && sudo docker-compose -f docker-compose.prod.yml up -d --build"

success "Deployment complete!"

# =============================================================================
# STEP 7: Summary
# =============================================================================
header "Deployment Summary"

echo "Instance: $INSTANCE_ID ($INSTANCE_TYPE)"
echo "Public IP: $INSTANCE_IP"
echo "Domain: $DOMAIN_NAME"
echo ""
echo "Application should be available at:"
echo "  http://$INSTANCE_IP:3003 (direct)"
echo "  https://$DOMAIN_NAME (via HTTPS after SSL setup)"
echo ""
echo "Next steps:"
echo "  1. Ensure $DOMAIN_NAME DNS A record points to $INSTANCE_IP"
echo "  2. Set up SSL certificate (run certbot on server)"
echo "  3. Check application logs: ssh $INSTANCE_IP 'docker logs tutorme-app'"
echo ""
echo "SSH command:"
echo "  ssh -i $SSH_KEY_PATH $SSH_USER@$INSTANCE_IP"
