FROM node:8

WORKDIR /usr/src/app

# Time zone
ENV TZ=Asia/Jerusalem
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# App prepare
COPY package*.json ./
COPY server.js ./
COPY client ./client/
RUN npm install --only=production

# Run conf
EXPOSE 4200
CMD [ "npm", "start" ]