#Choose the base image for the build
FROM node:8-slim
RUN mkdir -p /home/node/flight_data_microservice && chown -R node:node /home/node/flight_data_microservice
WORKDIR /home/node/flight_data_microservice
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
# RUN ["chmod", "755", "wait-for.sh"]
EXPOSE 50050
CMD [ "node", "index.js" ]