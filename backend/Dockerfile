# backend/Dockerfile

### BUILD STAGE ###
FROM node:16-alpine AS build

# 1) Install native build tooling
RUN apk add --no-cache python3 make g++ linux-headers

WORKDIR /app

# 2) Copy only package.json & lockfile, install deps and rebuild sqlite3
COPY package*.json ./
RUN npm ci --production \
 && npm rebuild sqlite3 --build-from-source

# 3) Copy the rest of your app’s source
COPY . .

### RUNTIME STAGE ###
FROM node:16-alpine
WORKDIR /app

# 4) Pull in everything from the build image (with correctly compiled binaries)
COPY --from=build /app /app

EXPOSE 5000
CMD ["node", "server.js"]