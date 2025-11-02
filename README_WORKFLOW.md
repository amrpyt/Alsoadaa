# 🚀 Complete Development & Deployment Workflow

## 📋 Overview

You have **TWO workflows** to choose from:

1. **Development Workflow** - Edit code on VPS with instant hot reloading (NO image push needed)
2. **Production Workflow** - Build and push v2 image to Docker Hub for production deployment

---

## 🔄 Workflow 1: Development on VPS (Recommended for Active Development)

### Current Situation

- You're developing locally on macOS
- You want to edit code on your VPS and see changes instantly
- **NO need to push Docker images** for this workflow

##### Steps

#### 1️⃣ **Push Your Code to Git** (On Your MacBook)

```bash
# In your project directory
git add .
git commit -m "Add Docker development setup"
git push origin main
```

#### 2️⃣ **Connect to Your VPS via SSH**

```bash
ssh your-user@your-vps-ip
```

#### 3️⃣ **Clone/Pull Your Repository on VPS**

```bash
# If first time, clone the repo
git clone https://github.com/your-username/your-repo.git alsoadaa-website
cd alsoadaa-website

# If already cloned, just pull latest changes
cd alsoadaa-website
git pull origin main
```

#### 4️⃣ **Start Development Server on VPS**

```bash
# Make sure dev.sh is executable
chmod +x dev.sh

# Run the helper script
./dev.sh
```

Then select option **1) Start Development Server**

#### 5️⃣ **Access Your Site**

Open browser: `http://your-vps-ip:5173`

#### 6️⃣ **Connect Windsurf to VPS via SSH**

In Windsurf:

1. Press `Cmd+Shift+P` (or `Ctrl+Shift+P`)
2. Type "Remote-SSH: Connect to Host"
3. Enter: `your-user@your-vps-ip`
4. Open folder: `/home/your-user/alsoadaa-website`

#### 7️⃣ **Edit Code Directly on VPS**

Now you can edit any file in Windsurf, and changes will **instantly reflect** in your browser! 🎉

**Files that auto-reload:**

- `src/**/*` - All source code
- `index.html` - Main HTML
- `vite.config.ts` - Vite config
- `tailwind.config.js` - Tailwind config
- Component files, styles, etc.

#### 8️⃣ **View Logs (Optional)**

In VPS terminal:

```bash
./dev.sh
# Select option 4) View Logs
```

Or directly:

```bash
docker-compose -f docker-compose.dev.yml logs -f
```

#### 9️⃣ **Stop Development Server (When Done)**

```bash
./dev.sh
# Select option 2) Stop Development Server
```

---

## 🏭 Workflow 2: Production Deployment (When Ready to Deploy)

### When to Use This

- You've finished developing and testing
- Ready to deploy to production on Dokploy
- Want to create a production-optimized build

### Steps

#### 1️⃣ **Test Locally First** (On MacBook or VPS)

```bash
# Build production image locally to test
docker build -t 00jimmy00/alsoadaa-website:v2 .

# Test it
docker run -p 8080:80 00jimmy00/alsoadaa-website:v2

# Visit http://localhost:8080 to verify
```

#### 2️⃣ **Build Production Image (v2)**

```bash
# On your MacBook or VPS
docker build -t 00jimmy00/alsoadaa-website:v2 .
docker tag 00jimmy00/alsoadaa-website:v2 00jimmy00/alsoadaa-website:latest
```

Or use the helper script:

```bash
./dev.sh
# Select option 6) Build Production Image (v2)
```

#### 3️⃣ **Login to Docker Hub**

```bash
docker login
# Enter your Docker Hub username and password
```

#### 4️⃣ **Push to Docker Hub**

```bash
docker push 00jimmy00/alsoadaa-website:v2
docker push 00jimmy00/alsoadaa-website:latest
```

Or use the helper script:

```bash
./dev.sh
# Select option 7) Push to Docker Hub (v2)
```

#### 5️⃣ **Deploy on Dokploy**

**Option A: Using Dokploy UI**

1. Go to your Dokploy dashboard
2. Update your service to use: `00jimmy00/alsoadaa-website:v2`
3. Redeploy

**Option B: Using Docker Compose on VPS**

```bash
# SSH to your VPS
ssh your-user@your-vps-ip

# Pull the new image
docker pull 00jimmy00/alsoadaa-website:v2

# Stop dev server if running
docker-compose -f docker-compose.dev.yml down

# Start production
docker-compose -f docker-compose.prod.yml up -d
```

#### 6️⃣ **Verify Production Deployment**

Visit: `http://your-vps-ip` (port 80)

---

## 🤔 Which Workflow Should I Use?

### Use **Development Workflow** (Workflow 1) When:

✅ Actively coding and testing
✅ Want instant feedback on changes
✅ Making frequent updates
✅ Debugging issues
✅ **NO Docker image push needed**

### Use **Production Workflow** (Workflow 2) When:

✅ Feature is complete and tested
✅ Ready for production deployment
✅ Want optimized, production-ready build
✅ Deploying to Dokploy or production server
✅ **Requires Docker image push**

---

## 📊 Comparison Table

| Feature                       | Development (Workflow 1) | Production (Workflow 2) |
| ----------------------------- | ------------------------ | ----------------------- |
| **Hot Reloading**       | ✅ Yes                   | ❌ No                   |
| **Image Push Required** | ❌ No                    | ✅ Yes                  |
| **Build Time**          | Fast (no build)          | Slower (full build)     |
| **Optimization**        | None                     | Full optimization       |
| **Port**                | 5173                     | 80                      |
| **Use Case**            | Active development       | Production deployment   |
| **Docker Image**        | Dev image (local)        | v2 (Docker Hub)         |

---

## 🔧 Common Scenarios

### Scenario 1: "I'm actively developing"

**Answer:** Use **Workflow 1** (Development)

- No need to push images
- Edit on VPS via Windsurf SSH
- See changes instantly

### Scenario 2: "I finished a feature and want to deploy"

**Answer:** Use **Workflow 2** (Production)

- Build and push v2 image
- Deploy on Dokploy

### Scenario 3: "I want to test on production before deploying"

**Answer:** Use both!

1. Test in development mode first (Workflow 1)
2. When satisfied, build and push v2 (Workflow 2)

---

## 🛠️ Quick Commands Reference

### Development Commands

```bash
# Start dev server
./dev.sh → Option 1

# View logs
./dev.sh → Option 4

# Stop dev server
./dev.sh → Option 2

# Rebuild (if you added dependencies)
./dev.sh → Option 5
```

### Production Commands

```bash
# Build v2
./dev.sh → Option 6

# Push to Docker Hub
./dev.sh → Option 7

# Or manually:
docker build -t 00jimmy00/alsoadaa-website:v2 .
docker push 00jimmy00/alsoadaa-website:v2
```

---

## 🚨 Important Notes

### About Development Mode

- **Container reads code from volumes** - your actual source files on VPS
- Changes are **instant** - no rebuild needed
- `node_modules` stays in container (not mounted)
- If you add new npm packages, rebuild: `./dev.sh` → Option 5

### About Production Mode

- **Container has code baked in** - no volumes
- Changes require **rebuild and push**
- Optimized with Nginx for performance
- Smaller image size

### About Your Current v1 Image

- Your existing `00jimmy00/alsoadaa-website:v1` is still on Docker Hub
- It will continue to work on Dokploy
- v2 has improvements: health checks, better caching, optimizations
- You can keep v1 running while testing v2

---

## 🎯 Recommended Workflow

**For Daily Development:**

1. Connect Windsurf to VPS via SSH
2. Start dev server: `./dev.sh` → Option 1
3. Edit code in Windsurf
4. See changes at `http://vps-ip:5173`
5. Stop when done: `./dev.sh` → Option 2

**When Ready to Deploy:**

1. Test everything in dev mode
2. Build v2: `./dev.sh` → Option 6
3. Push to Docker Hub: `./dev.sh` → Option 7
4. Deploy on Dokploy with v2 image

---

## 📞 Need Help?

### Check Container Status

```bash
./dev.sh → Option 8
```

### View Detailed Logs

```bash
docker logs alsoadaa-website-dev -f
```

### Restart Development Server

```bash
./dev.sh → Option 3
```

### Something Not Working?

1. Check if port 5173 is open on your VPS firewall
2. Verify Docker is running: `docker ps`
3. Check logs: `./dev.sh` → Option 4
4. Rebuild container: `./dev.sh` → Option 5

---

## 📚 Additional Documentation

- **QUICK_START.md** - Quick reference
- **DOCKER_DEVELOPMENT.md** - Detailed technical documentation
- **dev.sh** - Interactive helper script

---

**Happy Coding! 🚀**
