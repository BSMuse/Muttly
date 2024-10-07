# Base image for the server (Express)
FROM node:18-alpine

# Set working directory for the server
WORKDIR /app

# Copy package.json and install server dependencies
COPY package*.json ./
RUN npm install --include=dev

# Copy the .env file to the working directory `/app`
COPY ../.env .

# Copy the rest of the server code
COPY ./src ./src

# Expose the server port
EXPOSE 8080

# Start the server
CMD ["npm", "start"]
