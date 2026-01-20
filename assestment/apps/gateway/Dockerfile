# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:gateway

# Stage 2: production image
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist/apps/gateway ./dist
COPY package.json package-lock.json ./
RUN npm ci --production

EXPOSE 3000
CMD ["node", "dist/main.js"]


# EXPOSE 3000 = definiamo la porta che si crea nel network docker. il container ascolta le request in questa porta
# in docker-compose, quando definiamo : 
# ports:
#   - "3000:3000" (la prima porta 3000 e' il mio host, la seconda porta e il container)
# abbiamo impostato che quando avviene una request a http://localhost:3000, questa viene a sua volta inoltrata al container docker