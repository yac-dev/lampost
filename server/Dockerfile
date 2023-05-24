FROM jrottenberg/ffmpeg:4.4-alpine AS FFmpeg
FROM node:16-alpine

COPY --from=FFmpeg / /

RUN apk update && apk add --no-cache \
    imagemagick \
    graphicsmagick 

WORKDIR /app

COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your Express app listens on (change it if necessary)
EXPOSE 3500

# Start the Express app
CMD [ "npm", "run", "server:production" ]
