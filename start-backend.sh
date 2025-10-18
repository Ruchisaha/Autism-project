#!/bin/bash

# Kill existing backend processes
pkill -f "node.*server.js" 2>/dev/null

# Wait a moment
sleep 2

# Start backend in background
cd /home/navgurukul/Documents/Autism/Autism-project
nohup node Backend/server.js > backend_stable.log 2>&1 &

# Get the PID
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"

# Wait for startup
sleep 3

# Test if it's working
echo "Testing backend..."
curl -s http://localhost:4000/health
echo ""

echo "Backend is running. Check logs with: tail -f backend_stable.log"
echo "Stop backend with: pkill -f 'node.*server.js'"