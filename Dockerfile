# Stage 1: Build the application
FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run generate:init
RUN pnpm run build

# Stage 2: Create the final image
FROM node:20-slim

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/src ./src
COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install --prod=true

EXPOSE 3000

CMD [ "pnpm", "run", "start:prod" ]