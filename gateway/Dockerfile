#Choose the base image for the build
FROM node:8-slim
RUN mkdir -p /home/node/api_gateway && chown -R node:node /home/node/api_gateway
WORKDIR /home/node/api_gateway
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 4140
CMD [ "node", "index.js" ]