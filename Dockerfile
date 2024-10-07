# Use the lightweight Node image
FROM node:18-alpine

# Set working directory for the server
WORKDIR /app

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --include=dev

# Copy the server source code
COPY server/ ./server

# Expose the backend server port (adjust to match your backend port, e.g., 3000)
EXPOSE 8088

# Start the development server with Nodemon for hot-reloading
CMD ["npm", "run", "dev", "--prefix", "server"]
