# 🚀 Project Monorepo Setup

This repo contains three sub-projects:

frontend/
backend/
logger-middleware/

yaml
Copy
Edit

---

## 🧪 Prerequisites

- Node.js (v22.x recommended)  
- npm or yarn  
- Docker & Docker Compose

---

## 🔧 Backend Setup (`backend/`)

### ⚠️ Logger Middleware is **required**

The backend must use the shared logger middleware to record all requests and errors.

### 1. Configure `.env`

In `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/affordmedical"
PORT=3000
TOKEN=your_logging_service_token
2. Start PostgreSQL via Docker
bash
Copy
Edit
docker run --name pg-dev \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=affordmedical \
  -p 5432:5432 \
  -d postgres
3. Build & Install Logger Middleware
bash
Copy
Edit
cd logger-middleware
npm install
npm run build
In backend/package.json, add:

json
Copy
Edit
"dependencies": {
  "loggermiddleware": "file:../logger-middleware",
  ...
}
Then install in backend:

bash
Copy
Edit
cd ../backend
npm install
4. Generate Prisma Client
bash
Copy
Edit
cd backend
npm install prisma @prisma/client
npx prisma generate
5. Run Database Migrations
bash
Copy
Edit
npx prisma migrate dev --name init
To reset during development:

bash
Copy
Edit
npx prisma migrate reset
6. Integrate Logger Middleware
In backend/src/index.ts, add:

ts
Copy
Edit
import { requestLogger, errorLogger } from 'loggermiddleware'

app.use(requestLogger)
// ... your routes ...
app.use(errorLogger)
7. Start Backend Server
bash
Copy
Edit
npm run build
npm run start
Runs on http://localhost:3000/

🌐 Frontend Setup (frontend/)
bash
Copy
Edit
cd frontend
npm install
npm run dev
Runs on http://localhost:5173/

🧩 Logger Middleware (logger-middleware/)
Provides:

requestLogger(req, res, next)

errorLogger(err, req, res, next)

These are required in the backend and must be built before use.