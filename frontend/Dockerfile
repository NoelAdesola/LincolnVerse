# frontend/Dockerfile

### 1) Build stage ###
FROM node:16-alpine AS build

WORKDIR /app

# 1.1) Copy lockfiles & install deps
COPY package*.json ./
RUN npm ci

# 1.2) Copy source & build
COPY . .
RUN npm run build


### 2) Production stage ###
FROM nginx:stable-alpine

# 2.1) Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# 2.2) Copy over your React build
COPY --from=build /app/build /usr/share/nginx/html

# 2.3) Expose HTTP port & run
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
