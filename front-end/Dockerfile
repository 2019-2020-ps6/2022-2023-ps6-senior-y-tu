FROM node:16.16.0-alpine as build
USER node 

WORKDIR /front-end
COPY --chown=node:node package*.json /front-end
COPY --chown=node:node ./src /front-end/src
RUN npm install 
RUN npm install -g @angular/cli
EXPOSE 8080
RUN run build 

FROM nginx:1.21.1-alpine
COPY --from=build /front-end /usr/share/nginx/html