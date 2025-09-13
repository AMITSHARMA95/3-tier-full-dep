# Node.js base image
FROM node:18

# Working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Correct entry point
CMD ["node", "server.js"]

