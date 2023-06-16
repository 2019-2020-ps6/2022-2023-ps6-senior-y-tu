FROM node:16.16.0-alpine
USER node 

WORKDIR /backend
COPY --chown=node:node package*.json /backend
COPY --chown=node:node ./app /backend/app
COPY --chown=node:node ./database /backend/database  
RUN npm install 
EXPOSE 8000
CMD ["npm", "start"]
#rajouter curl 

# docker build -t backend:backend-node .
# docker run -p 8000:9428 backend:backend-node