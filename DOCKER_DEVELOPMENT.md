# Docker Development & Deployment Guide

This guide covers both development and production Docker workflows for the AlSoadaa Website.

## 📁 File Overview

- **`Dockerfile.dev`** - Development container with hot reloading
- **`docker-compose.dev.yml`** - Development environment with volume mounting
- **`Dockerfile`** - Production-optimized build (v2)
- **`docker-compose.prod.yml`** - Production deployment configuration

---

## 🔧 Development Workflow (Hot Reloading)

### Setup on Your VPS

1. **Clone the repository on your VPS:**
   ```bash
   git clone <your-repo-url> alsoadaa-website
   cd alsoadaa-website
   ```

2. **Start the development container:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. **View logs:**
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f
   ```

4. **Access your site:**
   - Open `http://your-vps-ip:5173`

### How It Works

- The `docker-compose.dev.yml` mounts your source code as volumes
- Any changes you make to files in `/src`, `index.html`, or config files are immediately reflected
- Vite's HMR (Hot Module Replacement) updates the browser in real-time
- No need to rebuild the container for code changes

### Making Changes

Simply edit your code on the VPS:
```bash
# SSH into your VPS
ssh user@your-vps

# Navigate to project
cd alsoadaa-website

# Edit files with your preferred editor
nano src/App.tsx
# or
vim src/components/Header.tsx
```

Changes will instantly appear in your browser! 🎉

### Stop Development Server

```bash
docker-compose -f docker-compose.dev.yml down
```

---

## 🚀 Production Workflow (v2)

### Build and Push to Docker Hub

1. **Build the production image:**
   ```bash
   docker build -t 00jimmy00/alsoadaa-website:v2 .
   ```

2. **Tag as latest (optional):**
   ```bash
   docker tag 00jimmy00/alsoadaa-website:v2 00jimmy00/alsoadaa-website:latest
   ```

3. **Push to Docker Hub:**
   ```bash
   docker push 00jimmy00/alsoadaa-website:v2
   docker push 00jimmy00/alsoadaa-website:latest
   ```

### Deploy on Dokploy

1. **Pull the image on your server:**
   ```bash
   docker pull 00jimmy00/alsoadaa-website:v2
   ```

2. **Run with docker-compose:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Or use Dokploy's interface:**
   - Image: `00jimmy00/alsoadaa-website:v2`
   - Port: `80`

---

## 🔄 Switching Between Development and Production

### Development → Production

1. Stop development container:
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

2. Start production container:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Production → Development

1. Stop production container:
   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```

2. Start development container:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

---

## 📦 Volume Management

### Development Volumes

The following are mounted for hot reloading:
- `./src` - Application source code
- `./public` - Public assets
- `./index.html` - Main HTML file
- `./vite.config.ts` - Vite configuration
- `./tailwind.config.js` - Tailwind CSS config
- `./tsconfig.json` - TypeScript config

### Important Notes

- `node_modules` is **NOT** mounted - it stays inside the container
- If you add new dependencies, rebuild the dev container:
  ```bash
  docker-compose -f docker-compose.dev.yml up -d --build
  ```

---

## 🐛 Troubleshooting

### Changes Not Reflecting?

1. **Check if container is running:**
   ```bash
   docker ps | grep alsoadaa-website-dev
   ```

2. **Restart the container:**
   ```bash
   docker-compose -f docker-compose.dev.yml restart
   ```

3. **Rebuild if needed:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d --build
   ```

### Port Already in Use?

```bash
# Check what's using port 5173
lsof -i :5173

# Kill the process or change the port in docker-compose.dev.yml
```

### Container Won't Start?

```bash
# View detailed logs
docker-compose -f docker-compose.dev.yml logs

# Remove and recreate
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
```

---

## 🎯 Quick Reference

### Development Commands

```bash
# Start dev environment
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop dev environment
docker-compose -f docker-compose.dev.yml down

# Rebuild dev container
docker-compose -f docker-compose.dev.yml up -d --build
```

### Production Commands

```bash
# Build v2 image
docker build -t 00jimmy00/alsoadaa-website:v2 .

# Push to Docker Hub
docker push 00jimmy00/alsoadaa-website:v2

# Run production
docker-compose -f docker-compose.prod.yml up -d

# View production logs
docker-compose -f docker-compose.prod.yml logs -f
```

---

## 🔐 Environment Variables

If you need environment variables, create a `.env` file:

```env
# Example .env file
VITE_API_URL=https://api.example.com
VITE_ENV=development
```

Then add to `docker-compose.dev.yml`:
```yaml
env_file:
  - .env
```

---

## 📊 Health Checks

The production container includes health checks:
- Checks every 30 seconds
- Times out after 3 seconds
- Retries 3 times before marking unhealthy

Check health status:
```bash
docker ps --format "table {{.Names}}\t{{.Status}}"
```

---

## 🆘 Need Help?

- Check container logs: `docker logs alsoadaa-website-dev`
- Inspect container: `docker inspect alsoadaa-website-dev`
- Shell into container: `docker exec -it alsoadaa-website-dev sh`

Happy coding! 🚀
