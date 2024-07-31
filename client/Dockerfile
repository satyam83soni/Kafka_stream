# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the build directory
RUN npm install -g serve

# Expose port 3000
EXPOSE 5173

# Command to serve the build directory
CMD ["serve", "-s", "build", "-l", "5173"]





