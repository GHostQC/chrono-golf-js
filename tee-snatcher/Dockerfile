# Use Node.js LTS as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy the entire workspace to handle workspace dependencies
COPY ../pnpm-lock.yaml ../pnpm-workspace.yaml ../package.json /app/
COPY ../chrono-golf-api /app/chrono-golf-api
COPY ../tee-snatcher /app/tee-snatcher

# Install dependencies
RUN cd /app && pnpm install --recursive

# Set the working directory to tee-snatcher
WORKDIR /app/tee-snatcher

# Command to run the application
CMD ["pnpm", "start::dry-run"]

# Expose any necessary ports (if applicable, adjust as needed)
# EXPOSE 3000
