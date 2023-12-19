# Use a smaller base image
FROM node:19.8.1-alpine


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# RUN npm install
RUN npm install --production && npm cache clean --force

# Bundle app source
COPY . .

EXPOSE 3101
CMD [ "node", "app.js" ]
