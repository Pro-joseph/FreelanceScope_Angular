FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG API_URL=http://localhost/api
RUN sed -i "s|http://localhost/api|$API_URL|g" src/environments/environment.ts \
    && sed -i "s|http://localhost/api|$API_URL|g" src/environments/environment.development.ts \
    && npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist/FreelanceScope_Angular ./dist
EXPOSE 4000
CMD ["node", "dist/server/server.mjs"]