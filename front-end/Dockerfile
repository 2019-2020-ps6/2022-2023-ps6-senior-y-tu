FROM node:16.16.0-alpine as build

WORKDIR /front-end

COPY  angular.json package*.json tsconfig*.json .editorconfig default.conf ./
COPY ./src ./src/

RUN npm install 
RUN npm run build 

FROM nginxinc/nginx-unprivileged:latest

USER nginx

COPY --from=build /front-end /usr/share/nginx/html
COPY --from=build /front-end/nginx.conf /etc/nginx/conf.d/

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]