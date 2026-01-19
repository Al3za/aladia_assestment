# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --workspace gateway

# Stage 2: production image
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist/apps/gateway ./dist
COPY package.json package-lock.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["node", "dist/main.js"]
