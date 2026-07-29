# Official Playwright image (browsers + OS deps pre-installed)
FROM mcr.microsoft.com/playwright:v1.61.1-jammy

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci

# Copy the rest of the project
COPY . .

# Install Allure commandline (already in devDependencies, this just ensures browsers are synced)
RUN npx playwright install --with-deps chromium

# Default command: run the full Playwright suite
CMD ["npx", "playwright", "test"]
