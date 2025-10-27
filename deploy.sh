#!/bin/bash

# Deployment script for Alsoadaa Website
# This script helps build and push the Docker image

set -e

echo "🚀 Alsoadaa Website Deployment Script"
echo "======================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Get Docker Hub username
read -p "Enter your Docker Hub username: " DOCKER_USERNAME

if [ -z "$DOCKER_USERNAME" ]; then
    echo "❌ Docker Hub username is required"
    exit 1
fi

IMAGE_NAME="$DOCKER_USERNAME/alsoadaa-website"
VERSION="latest"

echo ""
echo "📦 Building Docker image..."
docker build -t alsoadaa-website:$VERSION .

echo ""
echo "🏷️  Tagging image as $IMAGE_NAME:$VERSION"
docker tag alsoadaa-website:$VERSION $IMAGE_NAME:$VERSION

echo ""
echo "🔐 Logging in to Docker Hub..."
docker login

echo ""
echo "⬆️  Pushing image to Docker Hub..."
docker push $IMAGE_NAME:$VERSION

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your Dockerploy dashboard"
echo "2. Create a new project"
echo "3. Deploy from Docker Hub using: $IMAGE_NAME:$VERSION"
echo "4. Set port mapping: Container Port 80"
echo ""
echo "🌐 Your image: $IMAGE_NAME:$VERSION"
