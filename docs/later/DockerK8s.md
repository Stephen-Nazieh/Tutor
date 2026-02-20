# Docker & Kubernetes Implementation Plan
## Professional Frontend/Backend Separation

**Current Status:** ❌ Monolithic Next.js app - NOT production-ready for cloud deployment

**Target Architecture:** Separated Frontend (SPA/PWA) + Backend (API) with container orchestration

---

## 📊 Requirements Analysis

| Requirement | Current Status | Gap |
|-------------|----------------|-----|
| Frontend/Backend separation | ❌ Monolithic | Need to split Next.js into pure frontend + API backend |
| Frontend PWA on Vercel/Netlify | ⚠️ Partial | No separate build config for static hosting |
| Backend containerization | ❌ Missing | No Dockerfile for the app |
| Kubernetes deployment | ❌ Missing | No K8s YAML files |
| CORS configuration | ❌ Missing | No cross-origin setup |
| Docker Compose for local dev | ⚠️ Partial | Only infra services, not the app |

---

## 🏗️ Target Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         PRODUCTION                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐      ┌─────────────────────────────┐  │
│  │   Vercel/Netlify    │      │      AWS EKS / DO K8s       │  │
│  │                     │      │                             │  │
│  │  ┌───────────────┐  │      │  ┌─────────────────────┐   │  │
│  │  │  Next.js SPA  │  │◄────►│  │  Backend API Pod    │   │  │
│  │  │  (Static)     │  │ CORS │  │  - Node.js/Express  │   │  │
│  │  │  - PWA enabled│  │      │  │  - AI APIs          │   │  │
│  │  │  - Optimized  │  │      │  │  - Video metadata   │   │  │
│  │  └───────────────┘  │      │  └─────────────────────┘   │  │
│  │         ▲           │      │            ▲                │  │
│  │         │ CDN       │      │      ┌─────┴─────┐          │  │
│  └─────────┼───────────┘      │      │  Service  │          │  │
│            │                   │      │  (LB)     │          │  │
│            └───────────────────┼──────┴───────────┘          │  │
│                                │                             │  │
│                                │  ┌─────────────────────┐   │  │
│                                │  │  PostgreSQL Pod     │   │  │
│                                │  │  Redis Pod          │   │  │
│                                │  └─────────────────────┘   │  │
│                                └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      LOCAL DEVELOPMENT                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Docker Compose (Full Stack)                │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │    │
│  │  │  Frontend   │  │   Backend   │  │  Infrastructure │ │    │
│  │  │  (Next.js)  │  │   (API)     │  │  - Postgres     │ │    │
│  │  │  Port: 3000 │  │  Port: 3001 │  │  - Redis        │ │    │
│  │  └─────────────┘  └─────────────┘  │  - Ollama       │ │    │
│  │         ▲                  ▲       └─────────────────┘ │    │
│  │         └──────────────────┘                           │    │
│  │              Internal Network                          │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 New Project Structure

```
TutorMekimi/
├── frontend/                    # NEW: Separated Frontend
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/
│   ├── public/
│   ├── next.config.mjs          # Static export config
│   ├── Dockerfile               # Production build
│   └── package.json
│
├── backend/                     # NEW: Separated Backend
│   ├── src/
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── lib/                 # Utils
│   │   └── server.ts            # Express server
│   ├── prisma/                  # Database schema
│   ├── Dockerfile               # Production image
│   └── package.json
│
├── k8s/                         # NEW: Kubernetes configs
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── postgres-deployment.yaml
│   ├── postgres-service.yaml
│   ├── redis-deployment.yaml
│   ├── redis-service.yaml
│   └── ingress.yaml
│
├── docker-compose.yml           # MODIFIED: Full stack local dev
├── docker-compose.prod.yml      # NEW: Production compose
└── scripts/
    ├── deploy-frontend.sh       # Vercel deployment
    └── deploy-backend.sh        # K8s deployment
```

---

## Phase 1: Frontend Separation (4-6 hours)

### 1.1 Create Frontend Package
```bash
mkdir -p frontend/src/{app,components,hooks,lib,types}
cp -r tutorme-app/src/app frontend/src/
cp -r tutorme-app/src/components frontend/src/
cp -r tutorme-app/public frontend/
```

### 1.2 Configure Next.js for Static Export
```javascript
// frontend/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',              // Static HTML export
  distDir: 'dist',               // Output directory
  images: {
    unoptimized: true,           // Required for static export
  },
  
  // Environment variables for API
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  
  // CORS headers for API calls
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### 1.3 Update API Calls
```typescript
// frontend/src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    credentials: 'include',  // Send cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

// Usage in components
const data = await fetchAPI('/tutor/stats');
```

### 1.4 Frontend Dockerfile
```dockerfile
# frontend/Dockerfile
# Multi-stage build for production

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_API_URL=https://api.tutorme.com
RUN npm run build

# Stage 3: Runner (Nginx for static files)
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 1.5 Frontend Nginx Config
```nginx
# frontend/nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Serve index.html for all routes (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

---

## Phase 2: Backend API Separation (6-8 hours)

### 2.1 Create Express Backend
```bash
mkdir -p backend/src/{routes,services,middleware,lib}
```

### 2.2 Backend Server Entry
```typescript
// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

// Import routes
import authRoutes from './routes/auth';
import tutorRoutes from './routes/tutor';
import aiRoutes from './routes/ai';
import videoRoutes from './routes/video';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// CORS Configuration - SPECIFIC to frontend URL
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,  // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tutor', tutorRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/video', videoRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
  console.log(`CORS enabled for: ${corsOptions.origin}`);
});

export { prisma };
```

### 2.3 Backend Dockerfile
```dockerfile
# backend/Dockerfile
# Production-ready Node.js image

FROM node:20-alpine AS base

# Install dependencies for native modules
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy prisma schema
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine AS production

RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy from builder
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/package.json ./

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

CMD ["dumb-init", "node", "dist/server.js"]
```

---

## Phase 3: Kubernetes Configuration (4-6 hours)

### 3.1 Namespace
```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: tutorme
  labels:
    name: tutorme
    environment: production
```

### 3.2 ConfigMap
```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: tutorme-config
  namespace: tutorme
data:
  NODE_ENV: "production"
  PORT: "3001"
  FRONTEND_URL: "https://tutorme.vercel.app"
  DATABASE_URL: "postgresql://$(DB_USER):$(DB_PASSWORD)@postgres:5432/tutorme"
  REDIS_URL: "redis://redis:6379"
```

### 3.3 Secrets
```yaml
# k8s/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: tutorme-secrets
  namespace: tutorme
type: Opaque
stringData:
  DB_USER: "postgres"
  DB_PASSWORD: "<base64-encoded-password>"
  NEXTAUTH_SECRET: "<base64-encoded-secret>"
  KIMI_API_KEY: "<base64-encoded-key>"
  DAILY_API_KEY: "<base64-encoded-key>"
```

### 3.4 Backend Deployment
```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: tutorme
  labels:
    app: backend
spec:
  replicas: 3  # High availability
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: tutorme/backend:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 3001
          envFrom:
            - configMapRef:
                name: tutorme-config
            - secretRef:
                name: tutorme-secrets
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3001
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 3001
            initialDelaySeconds: 5
            periodSeconds: 5
```

### 3.5 Backend Service
```yaml
# k8s/backend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend
  namespace: tutorme
spec:
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3001
  type: ClusterIP
```

### 3.6 PostgreSQL Deployment
```yaml
# k8s/postgres-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: tutorme
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:16-alpine
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_USER
              valueFrom:
                secretKeyRef:
                  name: tutorme-secrets
                  key: DB_USER
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: tutorme-secrets
                  key: DB_PASSWORD
            - name: POSTGRES_DB
              value: "tutorme"
          volumeMounts:
            - name: postgres-storage
              mountPath: /var/lib/postgresql/data
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "500m"
      volumes:
        - name: postgres-storage
          persistentVolumeClaim:
            claimName: postgres-pvc
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
  namespace: tutorme
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

### 3.7 Ingress (Load Balancer)
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tutorme-ingress
  namespace: tutorme
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/cors-allow-origin: "https://tutorme.vercel.app"
    nginx.ingress.kubernetes.io/cors-allow-methods: "GET, POST, PUT, DELETE, OPTIONS"
    nginx.ingress.kubernetes.io/cors-allow-headers: "Authorization, Content-Type"
    nginx.ingress.kubernetes.io/cors-allow-credentials: "true"
spec:
  tls:
    - hosts:
        - api.tutorme.com
      secretName: tutorme-tls
  rules:
    - host: api.tutorme.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: backend
                port:
                  number: 80
```

---

## Phase 4: Docker Compose for Local Dev (2-3 hours)

### 4.1 Full Stack docker-compose.yml
```yaml
# docker-compose.yml (Modified for full stack)
version: '3.8'

services:
  # Frontend (Next.js Dev Server)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: tutorme-frontend
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3001
      - NODE_ENV=development
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
    networks:
      - tutorme-network

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: tutorme-backend
    restart: unless-stopped
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - PORT=3001
      - FRONTEND_URL=http://localhost:3000
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/tutorme
      - REDIS_URL=redis://redis:6379
      - OLLAMA_URL=http://ollama:11434
    volumes:
      - ./backend:/app
      - /app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - tutorme-network

  # PostgreSQL
  postgres:
    image: postgres:16-alpine
    container_name: tutorme-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: tutorme
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d tutorme"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - tutorme-network

  # Redis
  redis:
    image: redis:7-alpine
    container_name: tutorme-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - tutorme-network

  # Ollama AI
  ollama:
    image: ollama/ollama:latest
    container_name: tutorme-ollama
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    networks:
      - tutorme-network

networks:
  tutorme-network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
  ollama_data:
```

### 4.2 Development Dockerfiles
```dockerfile
# frontend/Dockerfile.dev
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
```

```dockerfile
# backend/Dockerfile.dev
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "dev"]
```

---

## Phase 5: Deployment Scripts (2-3 hours)

### 5.1 Frontend Deploy (Vercel)
```bash
#!/bin/bash
# scripts/deploy-frontend.sh

echo "Deploying Frontend to Vercel..."

cd frontend

# Install Vercel CLI if needed
npm i -g vercel

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL production --token $VERCEL_TOKEN

# Deploy
vercel --prod --token $VERCEL_TOKEN

echo "Frontend deployed!"
```

### 5.2 Backend Deploy (Kubernetes)
```bash
#!/bin/bash
# scripts/deploy-backend.sh

echo "Deploying Backend to Kubernetes..."

# Build and push Docker image
docker build -t tutorme/backend:latest ./backend
docker push tutorme/backend:latest

# Apply K8s configs
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/postgres-service.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/redis-service.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/ingress.yaml

# Wait for rollout
kubectl rollout status deployment/backend -n tutorme

echo "Backend deployed!"
```

---

## 📋 Environment Variables Reference

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.tutorme.com
NEXT_PUBLIC_SOCKET_URL=wss://api.tutorme.com
NEXT_PUBLIC_DAILY_DOMAIN=tutorme.daily.co
```

### Backend (.env)
```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://tutorme.vercel.app

# Database
DATABASE_URL=postgresql://user:pass@postgres:5432/tutorme

# Cache
REDIS_URL=redis://redis:6379

# AI
OLLAMA_URL=http://ollama:11434
KIMI_API_KEY=sk-xxx

# Auth
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=https://api.tutorme.com

# Video
DAILY_API_KEY=xxx
```

---

## 🧪 Testing Checklist

| Test | Command | Expected Result |
|------|---------|-----------------|
| Local Docker Compose | `docker-compose up` | All services start, frontend talks to backend |
| CORS Test | Frontend → Backend API | 200 OK with proper headers |
| Health Check | `curl /health` | `{status: "ok"}` |
| K8s Deploy | `kubectl get pods` | All pods Running |
| Ingress | `curl -H "Host: api.tutorme.com" <LB_IP>` | Routes to backend |

---

## 🚀 Migration Path from Current Monolith

1. **Week 1:** Create frontend/ and backend/ directories, copy code
2. **Week 2:** Update API calls, test local Docker Compose
3. **Week 3:** Create K8s configs, test in staging
4. **Week 4:** Production deployment, monitoring

---

## 📚 References

- [Next.js Static Export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Vercel Deployment](https://vercel.com/docs/concepts/deployments/overview)
