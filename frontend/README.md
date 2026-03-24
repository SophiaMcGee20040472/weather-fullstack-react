# Weather Fullstack React - Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

## Installation

### Frontend Setup

```bash
cd frontend
npm install
```

### Backend Setup

```bash
cd backend
npm install
```

## Running the Application

### Start Backend

```bash
cd backend
dontnet run
```

This backend will run on `http://localhost:5168`

### Start Frontend

```bash
cd frontend
npm run dev
```

The frontend will open at `http://localhost:5173/`

## Required Libraries

**Frontend:**

- react
- react-dom
- axios (API calls)
- react-router-dom (routing)

**Backend:**

- express
- cors
- dotenv
- nodemon (development)

## Environment Variables

Create a `.env` file in the backend directory with:

```
PORT=5000
NODE_ENV=development
```

## Common Commands

- `npm install` - Install dependencies
- `npm start` - Start application
- `npm test` - Run tests
- `npm run build` - Build for production
