# Stage 1: Build the application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .
COPY .env .env
# Build the application
RUN yarn run build

# Set working directory
WORKDIR /app

# Expose the port that Next.js listens on
EXPOSE 3000

# Set environment variables (optional)
ENV NODE_ENV=production

# Start the Next.js app
CMD ["yarn", "run", "start"]
