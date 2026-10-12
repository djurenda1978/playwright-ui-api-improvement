import { defineConfig, devices } from '@playwright/test';
import { envConfig } from './config/env';

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './tests',
    outputDir: 'test-results',

    /* Run tests in files in parallel */
    fullyParallel: false,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,

    /* No retries */
    retries: 0,

    /* Use one worker on CI, Playwright default locally */
    workers: process.env.CI ? 1 : undefined,

    /* Reporter to use */
    reporter: process.env.CI
        ? [
            ['list', { printSteps: true }],
            ['github'],
            ['junit', { outputFile: 'reports/junit.xml' }],
            ['allure-playwright', {
                resultsDir: 'allure-results',
                detail: true,
                suiteTitle: false
            }],
            ['html', { open: 'never' }],
            ['json', { outputFile: 'report-info/pw-results.json' }],
        ]
        : [
            ['list', { printSteps: true }],
            ['allure-playwright', {
                resultsDir: 'allure-results',
                detail: true,
                suiteTitle: false
            }],
            ['html', { open: 'never' }]
        ],

    /* Shared settings for all projects */
    use: {
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',

        /* Headless on CI, headed locally */
        headless: !!process.env.CI,
    },

    projects: [
        {
            name: 'ui',
            testDir: './tests/ui',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: envConfig.uiBaseURL,
                testIdAttribute: 'data-test',
            },
        },
        {
            name: 'api',
            testDir: './tests/api',
            use: {
                baseURL: envConfig.apiBaseURL,
            },
        },
    ],
});
