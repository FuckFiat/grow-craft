#!/bin/bash
echo ""
echo "========================================"
echo "  Grow Simulator MEGA"
echo "  Genetics & Evolution Edition"
echo "========================================"
echo ""
echo "Starting game server..."
echo ""
cd "$(dirname "$0")"
open "http://localhost:8080" 2>/dev/null || xdg-open "http://localhost:8080" 2>/dev/null || echo "Open http://localhost:8080 in your browser"
npx http-server -p 8080 -c-1