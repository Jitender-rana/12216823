# 🚀 Project Monorepo Setup

This repository contains three sub-projects:

frontend/
backend/
logger-middleware/

yaml
Copy
Edit

---

## 🧪 Prerequisites

- **Node.js** (v22.x recommended)  
- **npm** or **yarn**  
- **Docker** & **Docker Compose**

---

## 🔧 Backend Setup (`backend/`)

### 1. Configure Environment Variables

Create a `.env` file in `backend/` with the following:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/affordmedical"
PORT=3000
✅ Replace yourpassword with a password of your choice.

2. Start PostgreSQL with Docker
Run this command from the project root or inside backend/:

bash
Copy
Edit
docker run --name pg-dev \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=affordmedical \
  -p 5432:5432 \
  -d postgres
This will launch a local PostgreSQL instance on port 5432.

3. Install Dependencies & Generate Prisma Client
bash
Copy
Edit
cd backend
npm install prisma @prisma/client
npx prisma generate
Make sure your prisma/schema.prisma file matches the provided schema.

4. Run Migrations
bash
Copy
Edit
npx prisma migrate dev --name init
If you'd like to reset the database during development, run:

bash
Copy
Edit
npx prisma migrate reset
5. Start the Backend Server
bash
Copy
Edit
npm install
npm run build       # if using TypeScript (output to dist/)
npm run start       # or use node dist/index.js
Your API will be available at:

arduino
Copy
Edit
http://localhost:3000/
🌐 Frontend Setup (frontend/)
bash
Copy
Edit
cd frontend
npm install
npm run dev
The React + Vite app will launch on:

arduino
Copy
Edit
http://localhost:5173/
🧩 Logger Middleware (logger-middleware/)
If this folder contains a reusable logger package:

Add it as a dependency in backend/package.json (e.g. local reference)

Import and use it in your backend server.
