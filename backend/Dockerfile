FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install
COPY . .
# EXPOSE 9000
# CMD [ "node", "server.js" ]
# RUN node dbcreation.js
# RUN node userparse.js
# RUN node listingsparse.js
# RUN node reviewsparse.js

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

