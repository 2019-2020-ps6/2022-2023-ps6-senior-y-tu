FROM node:16.16.0-alpine
USER node 
#pas sur de cette ligne. ou on doit travailler ici ou que /
WORKDIR /backend
COPY --chown=node:node package*.json /backend
COPY --chown=node:node ./app /backend/app
COPY --chown=node:node ./database /backend/database  
RUN npm install 
EXPOSE 8000
CMD ["npm", "start"]