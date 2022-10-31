FROM node:16-alpine as builder

ENV NODE_ENV production

WORKDIR /app

COPY . .

RUN npm ci 

RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production

ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]