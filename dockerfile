FROM node:latest as firststage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=firststage /app/dist/front /usr/share/nginx/html