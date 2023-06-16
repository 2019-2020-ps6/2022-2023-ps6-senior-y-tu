FROM node:16.16.0-alpine as build

RUN apk add sed
RUN apk add curl
ARG BACK_PORT
ARG DOMAIN

WORKDIR /front-end

COPY .editorconfig angular.json package*.json tsconfig*.json default.conf ./
COPY ./src ./src/

RUN sed -i "s/<BACK_PORT>/${BACK_PORT:-8000}/g" /front-end/src/environments/environment.prod.ts
RUN sed -i "s/<DOMAIN>/${DOMAIN}:-localhost}/g" /front-end/src/environments/environment.prod.ts
RUN npm install
RUN npm run build

FROM nginxinc/nginx-unprivileged:latest

USER nginx

COPY --from=build /front-end/dist/front-end /usr/share/nginx/html/
COPY --from=build /front-end/default.conf /etc/nginx/conf.d/

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
