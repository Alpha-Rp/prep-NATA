#!/bin/bash

# 1. Move to the app folder on the server
cd /opt/app/mocknata || { echo "❌ Folder /opt/app/mocknata not found on server"; exit 1; }

echo "--- 📥 Pulling fresh code ---"
git stash
git pull origin main

echo "--- 🏗️ Docker Compose Build & Up ---"
docker compose up -d --build --remove-orphans

echo "--- 🧹 Cleanup ---"
docker image prune -f

echo "✅ Success! App is updated."
