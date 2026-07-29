FROM selenium/standalone-chrome:latest

USER root
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npm", "test"]
