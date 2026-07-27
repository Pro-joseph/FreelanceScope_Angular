FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG API_URL=http://localhost/api
RUN sed -i "s|http://localhost/api|$API_URL|g" src/environments/environment.ts \
    && npm run build

FROM nginx:alpine
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/FreelanceScope_Angular/browser /usr/share/nginx/html
EXPOSE 80