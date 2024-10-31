# Frontend Dockerfile
# Use offical Node.js image as the base image
FROM node:22-alpine

# Set the working directory of the container to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend directory into the container
COPY . .

# Build the React application
RUN npm run build

# Expose the port that the frontend runs on
EXPOSE 3000

# Set the command to start the frontend using serve
CMD ["npx", "serve", "-s", "build", "-l", "3000"]