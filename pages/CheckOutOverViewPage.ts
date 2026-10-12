import {expect, type Page, type Locator} from '@playwright/test';
import {BasePage} from './BasePage';
import {ProductList} from './common/ProductList';

export class CheckOutOverViewPage extends BasePage {
    readonly path = '/checkout-step-two.html';
    protected readonly pageAnchor: Locator;
    private readonly productList: ProductList;
    private readonly total: Locator;
    private readonly finishButton: Locator;

    constructor(page: Page) {
        super(page);

        this.pageAnchor = page.getByTestId('checkout-summary-container');
        this.productList = new ProductList(page);
        this.total = page.getByTestId('total-label');
        this.finishButton = page.getByTestId('finish');
    }

    async expectProductOverview(name: string, price: string, quantity: number): Promise<void> {
        await this.productList.expectProduct(name, price, quantity);
    }

    async expectTotalVisible(): Promise<void> {
        await expect(this.total).toBeVisible();
    }

    async finishCheckout(): Promise<void> {
        await this.finishButton.click();
    }

}
