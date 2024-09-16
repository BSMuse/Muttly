# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory for the app
WORKDIR /app

# Copy the entire project folder to ensure all paths are available
COPY . .

# Install server dependencies
WORKDIR /app/server
RUN npm install

# Install client dependencies
WORKDIR /app/client
RUN npm install

# Build the client-side code
RUN npm run build

# Move the built client files to the server's public directory
WORKDIR /app
RUN mv -f /app/client/dist/ /app/server/public/

# Expose the port that the server runs on
EXPOSE 3000

# Start the Express server
WORKDIR /app/server
CMD ["npm", "start"]
