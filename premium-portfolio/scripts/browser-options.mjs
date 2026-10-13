// CHROME_PATH is optional; otherwise use Playwright's installed Chromium.
export const browserOptions = process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {};
