# NestJS Microservices Assessment App

This project is a **NestJS-based microservices application** designed as part of a technical assessment. It demonstrates a modern architecture using **microservices, TCP communication, JWT authentication, rate limiting, and CORS**, along with a structured project layout.

---

## 🏗️ Project Structure

apps/
gateway/ # HTTP gateway that exposes REST endpoints and communicates with microservices
authentication/ # Authentication microservice handling user registration, login, and database access
common/ # Shared DTOs, RTOs, enums used across apps
core/ # Core utilities: JWT strategy, guards, rate limiting, CORS
config/ # Configuration files: microservice & database configurations


---

## ⚡ Features

### Gateway
- Exposes HTTP endpoints for client requests:
  - `POST /auth/register` – Register a new user
  - `POST /auth/login` – Login user and return JWT token
  - `GET /auth/users` – Retrieve employees (JWT-protected)
- Implements **rate limiting** per endpoint
- JWT validation using `@UseGuards(JwtAuthGuard)`
- TCP communication with Authentication microservice

### Authentication Microservice
- Handles **user management** and database access via Prisma
- Hashes passwords with bcrypt before storing in the database
- JWT token generation for authentication
- TCP server that listens for commands from the gateway

### Common / Core
- Shared DTOs, RTOs, enums
- Core modules provide:
  - JWT strategy and guard
  - Rate limiting via `ThrottlerModule`
  - CORS configuration

### Database
- PostgreSQL database managed via Prisma
- Employee model:
  ```prisma
  model Employee {
    id        Int      @id @default(autoincrement())
    email     String   @unique
    name      String
    role      Role     @default(INTERN)
    password  String
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }

  enum Role {
    INTERN
    ENGINEER
    ADMIN
  }

# 🚀 Running the Application

## Prerequisites

Node.js >= 20

PostgreSQL


# Docker & Docker Compose (optional, for containerized setup)

Local Development

Install dependencies:

npm install


# Start Authentication microservice:

cd apps/authentication
npm run start:dev


# Start Gateway:
cd apps/gateway
npm run start:dev

# Test endpoints via Postman or ThunderClient:

POST /auth/register

POST /auth/login

GET /auth/users (requires JWT token in Authorization: Bearer <token>)

# Docker Setup

Build and run the app with Docker Compose:

docker-compose up --build


# Services:

gateway – HTTP server (port 3000)

authentication – TCP microservice (port 3001)

postgres – Database (port 5432)


# 🛡️ Security & Features

JWT-based authentication and authorization

Rate limiting and throttling

CORS configuration for allowed origins

Centralized logging (optional)

Modular and scalable architecture


# 📝 Notes

The gateway communicates with the microservice via TCP using NestJS ClientProxy.

All shared DTOs and RTOs are in the common folder for reusability.

Environment variables (like JWT_SECRET and DATABASE_URL) are used for configuration.

# 📌 References

NestJS Microservices

NestJS Throttler (Rate Limiting)

NestJS JWT Authentication

Prisma ORM

