# Stage 1: Build the application
FROM node:18-alpine AS builder

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

# Stage 2: Serve the application with a lightweight server
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the built output from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the port that Next.js listens on
EXPOSE 3000

# Set environment variables (optional)
ENV NODE_ENV=production

# Start the Next.js app
CMD ["yarn", "run", "start"]
