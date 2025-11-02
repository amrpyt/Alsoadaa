#!/bin/bash

# Docker Hub Deployment Script for Alsoadaa Website
# Docker Hub Username: 00jimmy00

set -e

echo "🚀 Building and Pushing Alsoadaa Website to Docker Hub"
echo "======================================================="
echo ""

DOCKER_USERNAME="00jimmy00"
IMAGE_NAME="alsoadaa-website"
VERSION="latest"
FULL_IMAGE_NAME="$DOCKER_USERNAME/$IMAGE_NAME:$VERSION"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running. Please start Docker Desktop."
    exit 1
fi

echo "📦 Step 1: Building Docker image..."
echo "Building: $FULL_IMAGE_NAME"
echo ""

docker build -t $IMAGE_NAME:$VERSION .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""

echo "🏷️  Step 2: Tagging image..."
docker tag $IMAGE_NAME:$VERSION $FULL_IMAGE_NAME

echo ""
echo "🔐 Step 3: Logging in to Docker Hub..."
echo "Please enter your Docker Hub credentials for user: $DOCKER_USERNAME"
echo ""

docker login -u $DOCKER_USERNAME

if [ $? -ne 0 ]; then
    echo "❌ Docker login failed!"
    exit 1
fi

echo ""
echo "⬆️  Step 4: Pushing image to Docker Hub..."
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
echo "🌐 Docker Hub URL: https://hub.docker.com/r/$DOCKER_USERNAME/$IMAGE_NAME"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Next Steps for Dokploy:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Go to Dokploy dashboard"
echo "2. Create new project"
echo "3. Select 'Docker Hub' as source"
echo "4. Enter image name: $FULL_IMAGE_NAME"
echo "5. Set container port: 80"
echo "6. Click Deploy!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 Your image is ready for deployment!"
