#!/bin/bash
# Build landing page and integrate into Next.js app

set -e

echo "🚀 Building landing page..."
cd landing-page
npm install
npm run build

echo "📁 Creating public folder in tutorme-app..."
cd ../tutorme-app
mkdir -p public

echo "📝 Copying built landing page to public folder..."
cp -r ../landing-page/dist/* public/

echo "✅ Landing page integrated!"
echo ""
echo "Next steps:"
echo "1. Start your Next.js app: cd tutorme-app && npm run dev"
echo "2. Visit http://localhost:3003 - you should see the landing page"
echo ""
echo "To deploy:"
echo "- Build production: cd tutorme-app && npm run build"
echo "- Your landing page will be served at the root URL"
