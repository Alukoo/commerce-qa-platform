import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import env from './config/environments.js';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000,
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  use: {
    // Prefer a dedicated API base if present, otherwise fall back to the general BASE_URL
    baseURL: process.env.API_BASE_URL || process.env.BASE_URL || env.API_BASE_URL || env.BASE_URL || 'https://demoblaze.com',

    // automatically use recorded auth storage state if present
    storageState: fs.existsSync(path.join(process.cwd(), 'tests', 'state', 'auth.json'))
      ? path.join(process.cwd(), 'tests', 'state', 'auth.json')
      : undefined,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    actionTimeout: 10 * 1000,

    navigationTimeout: 30 * 1000,
    // If an API token is supplied via env, attach it to requests (best-effort)
    extraHTTPHeaders: (function () {
      const token = process.env.API_TOKEN || env.API_TOKEN;
      if (token) {
        return { Authorization: `Bearer ${token}` };
      }
      return {};
    })(),
  },

  projects: [

    // Desktop UI - Chromium
    {
      name: 'chromium',
      testIgnore: '**/api/**',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Desktop UI - Firefox
    {
      name: 'firefox',
      testIgnore: '**/api/**',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    // Desktop UI - WebKit
    {
      name: 'webkit',
      testIgnore: '**/api/**',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    // Mobile - Chrome
    {
      name: 'mobile-chrome',
      testIgnore: '**/api/**',
      use: {
        ...devices['Pixel 5'],
      },
    },

    // Mobile - Safari
    {
      name: 'mobile-safari',
      testIgnore: '**/api/**',
      use: {
        ...devices['iPhone 13'],
      },
    },

    // API
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.js',
    },
  ],
});