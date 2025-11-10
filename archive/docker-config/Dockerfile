# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies with clean install
RUN npm ci --only=production=false && \
    npm cache clean --force

# Copy source code
COPY . .

# Accept build arguments for Sanity configuration
ARG VITE_SANITY_PROJECT_ID
ARG VITE_SANITY_DATASET
ARG VITE_SANITY_API_VERSION
ARG VITE_SANITY_USE_CDN
ARG VITE_SANITY_TOKEN

# Set environment variables for build
ENV VITE_SANITY_PROJECT_ID=$VITE_SANITY_PROJECT_ID
ENV VITE_SANITY_DATASET=$VITE_SANITY_DATASET
ENV VITE_SANITY_API_VERSION=$VITE_SANITY_API_VERSION
ENV VITE_SANITY_USE_CDN=$VITE_SANITY_USE_CDN
ENV VITE_SANITY_TOKEN=$VITE_SANITY_TOKEN

# Build the application with production optimizations
RUN npm run build

# Production stage
FROM nginx:alpine

# Add metadata labels
LABEL maintainer="alsoadaa-website"
LABEL version="2.0"
LABEL description="AlSoadaa Website - Production Build v2"

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create nginx cache directories and set permissions
RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
