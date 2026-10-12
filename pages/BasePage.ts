import { expect, type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
    protected constructor(protected readonly page: Page) {}

    // pageAnchor - stable, unique element that confirms the page is loaded
    protected abstract readonly path: string;
    protected abstract readonly pageAnchor: Locator;

    // Relative paths use the baseURL configured for the UI project.
    async openPage(): Promise<void> {
        await this.page.goto(this.path);
    }

    async expectPageLoaded(): Promise<void> {
        // A string checks the exact URL, resolved against the configured baseURL.
        await expect(this.page).toHaveURL(this.path);
        await expect(this.pageAnchor).toBeVisible();
    }
}
