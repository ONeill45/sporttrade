FROM node:14.15.4-alpine

WORKDIR /usr/src/api

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install -g nodemon && npm ci

# Copying source files
COPY src/ src/

EXPOSE 5000

CMD [ "node", "server.js" ]