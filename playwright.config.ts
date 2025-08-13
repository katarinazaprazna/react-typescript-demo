import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './_playwright-tests/',
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  use: {
    baseURL: 'http://localhost:3000', // Adjust URL to match your development server
    testIdAttribute: 'data-ouia-component-id',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },
});
