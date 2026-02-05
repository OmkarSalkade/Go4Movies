# Use the official Go image
FROM golang:1.22-alpine

# Set the working directory
WORKDIR /app

# Copy go mod files first to leverage Docker caching
COPY go.mod go.sum* ./

# Download dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["go", "run", "server.go"]
