#!/bin/bash

# AlSoadaa Website - Development Helper Script

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  AlSoadaa Website - Dev Environment   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Function to show menu
show_menu() {
    echo -e "${GREEN}Choose an option:${NC}"
    echo "1) Start Development Server"
    echo "2) Stop Development Server"
    echo "3) Restart Development Server"
    echo "4) View Logs"
    echo "5) Rebuild Container"
    echo "6) Build Production Image (v2)"
    echo "7) Push to Docker Hub (v2)"
    echo "8) Check Container Status"
    echo "9) Exit"
    echo ""
    echo -ne "${YELLOW}Enter option [1-9]: ${NC}"
}

# Function to start dev server
start_dev() {
    echo -e "${GREEN}Starting development server...${NC}"
    docker-compose -f docker-compose.dev.yml up -d
    echo -e "${GREEN}✓ Development server started!${NC}"
    echo -e "${BLUE}Access your site at: http://localhost:5173${NC}"
}

# Function to stop dev server
stop_dev() {
    echo -e "${YELLOW}Stopping development server...${NC}"
    docker-compose -f docker-compose.dev.yml down
    echo -e "${GREEN}✓ Development server stopped!${NC}"
}

# Function to restart dev server
restart_dev() {
    echo -e "${YELLOW}Restarting development server...${NC}"
    docker-compose -f docker-compose.dev.yml restart
    echo -e "${GREEN}✓ Development server restarted!${NC}"
}

# Function to view logs
view_logs() {
    echo -e "${BLUE}Viewing logs (Press Ctrl+C to exit)...${NC}"
    docker-compose -f docker-compose.dev.yml logs -f
}

# Function to rebuild
rebuild() {
    echo -e "${YELLOW}Rebuilding development container...${NC}"
    docker-compose -f docker-compose.dev.yml up -d --build
    echo -e "${GREEN}✓ Container rebuilt!${NC}"
}

# Function to build production
build_prod() {
    echo -e "${YELLOW}Building production image (v2)...${NC}"
    docker build -t 00jimmy00/alsoadaa-website:v2 .
    docker tag 00jimmy00/alsoadaa-website:v2 00jimmy00/alsoadaa-website:latest
    echo -e "${GREEN}✓ Production image built successfully!${NC}"
    echo -e "${BLUE}Tagged as: 00jimmy00/alsoadaa-website:v2 and :latest${NC}"
}

# Function to push to Docker Hub
push_dockerhub() {
    echo -e "${YELLOW}Pushing to Docker Hub...${NC}"
    docker push 00jimmy00/alsoadaa-website:v2
    docker push 00jimmy00/alsoadaa-website:latest
    echo -e "${GREEN}✓ Images pushed to Docker Hub!${NC}"
}

# Function to check status
check_status() {
    echo -e "${BLUE}Container Status:${NC}"
    docker ps -a | grep alsoadaa-website || echo -e "${RED}No containers found${NC}"
    echo ""
    echo -e "${BLUE}Images:${NC}"
    docker images | grep alsoadaa-website || echo -e "${RED}No images found${NC}"
}

# Main loop
while true; do
    show_menu
    read choice
    echo ""
    
    case $choice in
        1) start_dev ;;
        2) stop_dev ;;
        3) restart_dev ;;
        4) view_logs ;;
        5) rebuild ;;
        6) build_prod ;;
        7) push_dockerhub ;;
        8) check_status ;;
        9) 
            echo -e "${GREEN}Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option. Please try again.${NC}"
            ;;
    esac
    
    echo ""
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read
    clear
done
