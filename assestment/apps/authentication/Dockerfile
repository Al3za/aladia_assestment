# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci
# COPY . .
# RUN npm run build:authentication 
# #  build authentication is defined in package json

# FROM node:20-alpine
# WORKDIR /app
# COPY --from=builder /app/dist/apps/authentication ./dist
# COPY package.json package-lock.json ./
# RUN npm ci --production
# EXPOSE 3001
# CMD ["node", "dist/main.js"] 

FROM node:20-alpine AS builder

# app is the folder name of docker network, where we copy the code dependencies and build authentication microservice
WORKDIR /app 
# copy all authentication app dependencies in package.json package-lock.json
COPY package.json package-lock.json ./ 
RUN npm ci

# → Copia all monorepo: apps/, common/, core/, config/, tsconfig.json, nest-cli.json
COPY . .
#build the app authentication defined in package.json. output in: dist/apps/authentication
RUN npm run build:authentication

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3001
CMD ["node", "dist/apps/authentication/main"]
