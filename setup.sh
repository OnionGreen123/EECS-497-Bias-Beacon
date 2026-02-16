#!/usr/bin/env bash

set -e

PROJECT_NAME="biasbeacon"

echo "Creating project: $PROJECT_NAME"

# Root
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

touch README.md .gitignore package.json requirements.txt docker-compose.yml

# -----------------------------
# docs
# -----------------------------
mkdir -p docs/{gantt-chart,meeting-notes,ui-mockups}
touch docs/proposal.md docs/architecture.md

# -----------------------------
# extension
# -----------------------------
mkdir -p extension/public/icons
mkdir -p extension/src/{content,background,popup,tooltip,api,state,utils,types}

touch extension/public/manifest.json

touch extension/src/content/content.ts
touch extension/src/content/textExtractor.ts

touch extension/src/background/background.ts

touch extension/src/popup/Popup.tsx
touch extension/src/popup/popup.html
touch extension/src/popup/popup.css

touch extension/src/tooltip/Tooltip.tsx
touch extension/src/tooltip/tooltip.css

touch extension/src/api/biasApi.ts

touch extension/package.json
touch extension/tsconfig.json
touch extension/vite.config.ts

# -----------------------------
# backend
# -----------------------------
mkdir -p backend/app/{api,services,pipeline,schemas,core,utils}
mkdir -p backend/tests

touch backend/app/main.py

touch backend/app/api/analyze.py

touch backend/app/services/bias_detector.py
touch backend/app/services/embedding_service.py
touch backend/app/services/explanation_service.py

touch backend/app/pipeline/processing_pipeline.py

touch backend/app/schemas/request.py
touch backend/app/schemas/response.py

touch backend/app/core/config.py
touch backend/app/core/logging.py

touch backend/requirements.txt
touch backend/Dockerfile

# -----------------------------
# models
# -----------------------------
mkdir -p models/{configs,experiments,evaluation}

# -----------------------------
# shared
# -----------------------------
mkdir -p shared/{types,constants,sample-data}

touch shared/types/bias.ts

# -----------------------------
# scripts
# -----------------------------
mkdir -p scripts
touch scripts/setup.sh scripts/dev.sh scripts/format.sh

# -----------------------------
# tests
# -----------------------------
mkdir -p tests/{e2e,integration}

echo "Done."
