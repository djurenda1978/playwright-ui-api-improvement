import {expect, type Page, type Locator} from '@playwright/test';
import {BasePage} from './BasePage';
import {messages} from '@/test-data/messages';

export class CheckOutCompletePage extends BasePage {
    readonly path = '/checkout-complete.html';
    protected readonly pageAnchor: Locator;
    private readonly confirmationMessage: Locator;
    private readonly backHomeButton: Locator;

    constructor(page: Page) {
        super(page);

        this.pageAnchor = page.getByTestId('checkout-complete-container');
        this.confirmationMessage = page.getByTestId('complete-header');
        this.backHomeButton = page.getByTestId('back-to-products');
    }

    async expectOrderComplete(): Promise<void> {
        await expect(this.confirmationMessage).toHaveText(messages.orderComplete);
    }

    async backToProducts(): Promise<void> {
        await this.backHomeButton.click();
    }
}
