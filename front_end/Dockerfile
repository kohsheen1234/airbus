#Choose the base image for the build
FROM node:8-slim
RUN mkdir -p /home/node/front_end && chown -R node:node /home/node/front_end
WORKDIR /home/node/front_end
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
# RUN ["chmod", "755", "wait-for.sh"]
EXPOSE 3000
CMD [ "node", "app.js" ]