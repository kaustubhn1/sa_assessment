FROM node:16.16.0-alpine AS development
ENV NODE_ENV development
WORKDIR /app/frontend
COPY package.json  .
RUN npm install
COPY . ./
EXPOSE 3000
