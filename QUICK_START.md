# 🚀 Quick Start Guide

## Development Setup (Hot Reloading on VPS)

### Option 1: Use Helper Script (Easiest)

```bash
./dev.sh
```

Then select option 1 to start development server.

### Option 2: Manual Commands

```bash
# Start development with hot reloading
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop
docker-compose -f docker-compose.dev.yml down
```

**Access:** `http://your-vps-ip:5173`

---

## Production Build & Push (v2)

### Build and Push to Docker Hub

```bash
# Build v2 image
docker build -t 00jimmy00/alsoadaa-website:v2 .
docker tag 00jimmy00/alsoadaa-website:v2 00jimmy00/alsoadaa-website:latest

# Push to Docker Hub
docker push 00jimmy00/alsoadaa-website:v2
docker push 00jimmy00/alsoadaa-website:latest
```

### Deploy on Dokploy

```bash
docker pull 00jimmy00/alsoadaa-website:v2
docker-compose -f docker-compose.prod.yml up -d
```

---

## What You Get

### Development Mode
✅ Live hot reloading  
✅ Edit code on VPS directly  
✅ Changes reflect instantly  
✅ No rebuild needed  

### Production Mode
✅ Optimized Nginx build  
✅ Health checks included  
✅ Small image size  
✅ Ready for Dokploy  

---

## File Structure

```
project/
├── Dockerfile              # Production build (v2)
├── Dockerfile.dev          # Development with hot reload
├── docker-compose.dev.yml  # Dev environment config
├── docker-compose.prod.yml # Production config
├── dev.sh                  # Helper script
└── DOCKER_DEVELOPMENT.md   # Full documentation
```

---

## Common Tasks

### Add New Dependencies

```bash
# Add to package.json, then rebuild dev container
docker-compose -f docker-compose.dev.yml up -d --build
```

### Switch Ports

Edit `docker-compose.dev.yml` or `docker-compose.prod.yml`:
```yaml
ports:
  - "8080:5173"  # Change 8080 to your preferred port
```

### View Container Logs

```bash
# Development
docker logs alsoadaa-website-dev -f

# Production
docker logs alsoadaa-website-prod -f
```

---

## Need More Help?

📖 See [DOCKER_DEVELOPMENT.md](./DOCKER_DEVELOPMENT.md) for detailed documentation.
