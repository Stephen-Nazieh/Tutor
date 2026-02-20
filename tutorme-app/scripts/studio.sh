#!/bin/bash

# Start Prisma Studio - Database GUI
# Usage: npm run studio
# Or: bash scripts/studio.sh

echo "╔════════════════════════════════════════════════════════╗"
echo "║         Opening Prisma Studio...                       ║"
echo "║         Database Management GUI                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check if database is running
if ! docker ps | grep -q tutorme-db; then
    echo "⚠️  Database container is not running!"
    echo ""
    echo "Starting database first..."
    docker start tutorme-db 2>/dev/null || {
        echo "❌ Failed to start database. Run 'npm run initialize' first."
        exit 1
    }
    sleep 3
    echo "✅ Database started"
    echo ""
fi

echo "🚀 Starting Prisma Studio..."
echo ""
echo "   Opening: http://localhost:5555"
echo ""
echo "   Use this GUI to:"
echo "   • Browse all tables (Users, Curriculums, etc.)"
echo "   • Add/edit/delete records"
echo "   • View relationships"
echo ""
echo "   Press Ctrl+C to stop"
echo ""

npx prisma studio
