FROM node:16.16.0-alpine as build

#ARG ENVIIRRONMENT

WORKDIR /front-end

COPY .editorconfig angular.json package*.json tsconfig*.json default.conf ./
COPY ./src ./src/

RUN npm install
RUN npm run build

FROM nginxinc/nginx-unprivileged:latest

USER nginx

COPY --from=build /front-end/dist/front-end /usr/share/nginx/html/
COPY --from=build /front-end/default.conf /etc/nginx/conf.d/

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
