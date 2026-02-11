# Use a lightweight Node.js image as base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

ENV PORT=3000

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build

# Start the application
CMD ["node", "server.js"]
