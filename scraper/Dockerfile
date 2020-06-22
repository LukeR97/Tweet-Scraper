FROM node:lts-alpine
RUN npm install -g http-server
RUN apt-get -q update && apt-get -qy install netcat
WORKDIR ./
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3007
CMD [ "node", "server.js" ]