#!/bin/bash

# Build Docker image for AMD64 (Linux x86_64) architecture
# Required for Dokploy and most cloud platforms

set -e

echo "🚀 Building Alsoadaa Website for AMD64 (Linux x86_64)"
echo "====================================================="
echo ""

DOCKER_USERNAME="00jimmy00"
IMAGE_NAME="alsoadaa-website"
VERSION="latest"
FULL_IMAGE_NAME="$DOCKER_USERNAME/$IMAGE_NAME:$VERSION"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed."
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running. Please start Docker Desktop."
    exit 1
fi

echo "ℹ️  Your system architecture: $(uname -m)"
echo "🎯 Target architecture: linux/amd64"
echo ""

echo "📦 Building Docker image for AMD64 platform..."
echo "This may take a few minutes on Apple Silicon Macs..."
echo ""

# Build for AMD64 platform
docker buildx build \
  --platform linux/amd64 \
  -t $FULL_IMAGE_NAME \
  --load \
  .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""

echo "🔐 Logging in to Docker Hub..."
echo "Please enter your Docker Hub credentials for user: $DOCKER_USERNAME"
echo ""

docker login -u $DOCKER_USERNAME

if [ $? -ne 0 ]; then
    echo "❌ Docker login failed!"
    exit 1
fi

echo ""
echo "⬆️  Pushing image to Docker Hub..."
docker push $FULL_IMAGE_NAME

if [ $? -ne 0 ]; then
    echo "❌ Docker push failed!"
    exit 1
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Deployment Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🐳 Docker Hub Image: $FULL_IMAGE_NAME"
echo "🏗️  Architecture: linux/amd64"
echo "🌐 Docker Hub URL: https://hub.docker.com/r/$DOCKER_USERNAME/$IMAGE_NAME"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Deploy on Dokploy:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Source: Docker Hub"
echo "Image: $FULL_IMAGE_NAME"
echo "Container Port: 80"
echo ""
echo "✅ This image will now work on Dokploy!"
echo ""
