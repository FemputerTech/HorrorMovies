# Backend Dockerfile
# Use offical Node.js image as the base image
FROM node:22-alpine

# Set the working directory of the container to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend directory into the container
COPY . .

# Expose the port that the backend runs on
EXPOSE 5000

# Set the command to start the backend server
CMD ["npm", "start"]