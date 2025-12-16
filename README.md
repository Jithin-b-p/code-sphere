# CODESPHERE

A coding platform built to demonstrate real-world full-stack engineering using modern tools.

---

## Tech Stack

- **Frontend:** Next.js (TypeScript)
- **Backend:** Express.js (TypeScript)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **DevOps:** Docker, Docker Compose

---

## Install

```bash
git clone git@github.com:Jithin-b-p/code-sphere.git
cd code-sphere
```

## Run (Local Development)

```bash
docker compose up --build
```

### Services will be available at:

Frontend → http://localhost:3000

Backend → http://localhost:4000

Health Check → http://localhost:4000/health

## Architecture

This project uses a monorepo structure:

```bash
codesphere/
├─ apps/
│ ├─ frontend/ # Next.js UI
│ └─ backend/ # Express API
├─ prisma/ # Database schema
├─ docker-compose.yml
```
