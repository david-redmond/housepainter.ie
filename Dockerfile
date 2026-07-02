# Use a lightweight Node.js image as base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy the rest of the application code to the working directory
COPY . .

# Build-time public config. NEXT_PUBLIC_* values are inlined into the client
# bundle during `next build`, so the GA measurement ID must be present here.
# Pass it with: docker build --build-arg NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX .
ARG NEXT_PUBLIC_GA_ID=""
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID

# Build the Next.js application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runtime secrets (RESEND_API_KEY, EMAIL_TO, EMAIL_FROM) are intentionally NOT
# baked into the image. Provide them at runtime, e.g.:
#   docker run -e RESEND_API_KEY=... -e EMAIL_TO=... -e EMAIL_FROM=... ...
# The /api/quote route fails loud (HTTP 500) in production if these are unset.

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Expose the port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
