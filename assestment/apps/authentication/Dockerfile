FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --workspace authentication

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist/apps/authentication ./dist
COPY package.json package-lock.json ./
RUN npm ci --production
EXPOSE 3001
CMD ["node", "dist/main.js"]
