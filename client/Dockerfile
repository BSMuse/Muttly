# Inside Dockerfile for client

# Use a Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Expose the port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
