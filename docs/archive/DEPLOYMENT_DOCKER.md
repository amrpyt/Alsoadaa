# Deployment Guide

This guide covers deploying the Alsoadaa website to various platforms including Dockerploy.

## Prerequisites

- Docker installed locally (for testing)
- GitHub account
- Docker Hub account (optional)
- Dockerploy account

## Option 1: Deploy via GitHub (Recommended for Dockerploy)

### Step 1: Push to GitHub

Your repository has been created at: **https://github.com/amrpyt/alsoadaa-website**

To push your code:

```bash
# Configure Git credentials if needed
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Push to GitHub (you may need to authenticate)
git push -u origin main
```

If you encounter authentication issues, you can:
- Use GitHub Personal Access Token
- Set up SSH keys
- Use GitHub Desktop

### Step 2: Deploy to Dockerploy from GitHub

1. Log in to your Dockerploy account
2. Click "New Project" or "Deploy"
3. Select "Deploy from GitHub"
4. Choose the repository: `amrpyt/alsoadaa-website`
5. Dockerploy will automatically detect the `Dockerfile`
6. Configure environment variables if needed
7. Click "Deploy"

Dockerploy will:
- Clone your repository
- Build the Docker image
- Deploy the container
- Provide you with a public URL

---

## Option 2: Deploy via Docker Hub

### Step 1: Build and Tag the Image

```bash
# Build the image
docker build -t alsoadaa-website:latest .

# Tag for Docker Hub (replace 'yourusername' with your Docker Hub username)
docker tag alsoadaa-website:latest yourusername/alsoadaa-website:latest
```

### Step 2: Push to Docker Hub

```bash
# Login to Docker Hub
docker login

# Push the image
docker push yourusername/alsoadaa-website:latest
```

### Step 3: Deploy to Dockerploy from Docker Hub

1. Log in to Dockerploy
2. Click "New Project" or "Deploy"
3. Select "Deploy from Docker Hub"
4. Enter your image name: `yourusername/alsoadaa-website:latest`
5. Configure port mapping (container port 80)
6. Click "Deploy"

---

## Option 3: Local Testing

### Test with Docker

```bash
# Build the image
docker build -t alsoadaa-website:latest .

# Run the container
docker run -p 8080:80 alsoadaa-website:latest

# Or use docker-compose
docker-compose up -d
```

Visit http://localhost:8080 to test the application.

### Test with Docker Compose

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

---

## Environment Variables (Optional)

If you need to add environment variables for API keys or configuration:

1. Create a `.env` file (already in .gitignore):
```env
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key_here
```

2. Update `Dockerfile` to include build args:
```dockerfile
ARG VITE_API_URL
ARG VITE_API_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY=$VITE_API_KEY
```

3. Pass them during build:
```bash
docker build \
  --build-arg VITE_API_URL=https://api.example.com \
  --build-arg VITE_API_KEY=your_key \
  -t alsoadaa-website:latest .
```

---

## Dockerploy Configuration

### Automatic Deployment

To enable automatic deployments when you push to GitHub:

1. In Dockerploy, go to your project settings
2. Enable "Auto Deploy"
3. Select the branch (main)
4. Every push to main will trigger a new deployment

### Custom Domain

To use a custom domain:

1. In Dockerploy, go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update your DNS records as instructed
5. Enable SSL/HTTPS (usually automatic)

---

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Ensure `npm run build` works locally
- Check Docker build logs for specific errors

### Container Won't Start

- Verify nginx configuration is correct
- Check that port 80 is exposed
- Review container logs

### Application Not Loading

- Ensure the build output is in `/dist` directory
- Check nginx is serving files from `/usr/share/nginx/html`
- Verify client-side routing is configured in nginx

---

## Performance Optimization

The Docker image includes:

- ✅ Multi-stage build (smaller image size)
- ✅ Nginx for serving static files
- ✅ Gzip compression enabled
- ✅ Static asset caching
- ✅ Security headers configured

Expected image size: ~50-60MB

---

## Quick Commands Reference

```bash
# Build
docker build -t alsoadaa-website:latest .

# Run locally
docker run -p 8080:80 alsoadaa-website:latest

# Push to Docker Hub
docker tag alsoadaa-website:latest username/alsoadaa-website:latest
docker push username/alsoadaa-website:latest

# Docker Compose
docker-compose up -d
docker-compose down
docker-compose logs -f
```

---

## Support

For issues with:
- **Application**: Check the GitHub repository issues
- **Docker**: Refer to Docker documentation
- **Dockerploy**: Contact Dockerploy support

## Repository

GitHub: https://github.com/amrpyt/alsoadaa-website
