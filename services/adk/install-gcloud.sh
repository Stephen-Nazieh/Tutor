#!/bin/bash
echo "=== Installing Google Cloud SDK ==="

# For macOS with Homebrew
if command -v brew &> /dev/null; then
    echo "Installing via Homebrew..."
    brew install google-cloud-sdk
else
    # Direct download for macOS
    echo "Downloading Google Cloud SDK..."
    curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-458.0.1-darwin-x86_64.tar.gz
    tar -xzf google-cloud-cli-458.0.1-darwin-x86_64.tar.gz
    ./google-cloud-sdk/install.sh --quiet --path-update=true
fi

echo ""
echo "=== Installation Complete ==="
echo "Please restart your terminal or run:"
echo "  source ~/.zshrc"
echo ""
echo "Then login with:"
echo "  gcloud auth login"
