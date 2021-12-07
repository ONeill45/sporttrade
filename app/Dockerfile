FROM node:14.15.4-alpine

ENV REACT_APP_API_URL=http://localhost:5000/profit

WORKDIR /usr/src/app
 
COPY package*.json ./
RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD [ "npm", "start" ]