# TaskFlow - Todo List Application

A full-stack todo application with JWT authentication, AI-powered daily summaries, and Docker support.

## Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Groq API (AI Summaries)

**DevOps:**
- Docker
- Docker Compose

## Features

- User authentication (Register/Login)
- Create, Read, Update, Delete tasks
- Task prioritization (Low, Medium, High)
- Task grouping (Today, Upcoming, Completed)
- AI-powered daily summaries using Groq API
- Responsive design with Tailwind CSS
- Dockerized application

## Quick Start

### Without Docker

**Prerequisites:**
- Node.js (v18+)
- MongoDB running locally

**Backend Setup:**
```bash
cd backend
npm install
npm run dev
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```

### With Docker

**Prerequisites:**
- Docker
- Docker Compose

**Run All Services:**
```bash
docker-compose up --build
```

Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:5050
- MongoDB: mongodb://localhost:27017

## Environment Variables

**Backend (.env):**
```
PORT=5050
MONGO_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=Enter any secret and secure key
NODE_ENV=development
GROQ_API_KEY=Groq Api here
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

**Authentication:**
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

**Tasks (Protected):**
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task
- POST `/api/tasks/summary` - Generate AI summary

## Project Structure

```
todo-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       └── utils/
├── Dockerfile.backend
├── Dockerfile.frontend
└── docker-compose.yml
```

## Usage

1. Register a new account
2. Login with credentials
3. Add tasks with title, description, due date, and priority
4. Mark tasks as complete
5. View tasks grouped by Today, Upcoming, and Completed
6. Generate AI daily summary of completed tasks

## Getting Groq API Key

1. Visit https://console.groq.com
2. Sign up for free account
3. Generate API key
4. Add to backend `.env` file

## Docker Commands

```bash
# Start services
docker-compose up

# Stop services
docker-compose down
```

## Development

**Backend runs on:** http://localhost:5050  
**Frontend runs on:** http://localhost:3000  
**MongoDB runs on:** mongodb://localhost:27017

## License

MIT
