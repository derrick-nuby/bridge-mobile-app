# Edge React Native App

This repository contains a React Native app that interacts with a Node.js backend service to run machine learning classifications using Edge Impulse. The backend service provides REST API endpoints for:

- Running classifications on raw feature data
- Retrieving model information and properties

## API Endpoints

### POST /api/inference/classify

Run inference with raw features. Accepts features as either:

- Comma-separated string of numbers
- Array of numbers

### GET /api/inference/model-info

Get information about the loaded Edge Impulse model and its properties.

## Setup

1. Install dependencies for the backend service:

```bash
npm install
```

2. Start the backend server:

```bash
npm start
```

The server will automatically initialize the Edge Impulse classifier on startup.

3. Run the React Native app to interact with the backend service.
