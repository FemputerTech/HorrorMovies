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

# Set the environment variable for the React app
ENV REACT_APP_BACKEND_URL=https://horrormovies-backend-754209826365.us-west1.run.app

# Build the React application
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Expose the port that the frontend runs on
EXPOSE 8080

# Set the command to start the frontend using serve
CMD ["npx", "serve", "-s", "build", "-l", "8080"]