import {expect, type Page, type Locator} from '@playwright/test';

export class ProductList {
    private readonly items: Locator;
    private readonly EXPECTED_COUNT = 1;

    constructor(private readonly page: Page) {
        this.items = page.getByTestId('inventory-item');
    }

    async expectProduct(name: string, price: string, quantity: number): Promise<void> {
        // Find the whole product card containing the matching name, so price and quantity are checked in the same card.
        const productItem = this.items.filter({
            has: this.page.getByTestId('inventory-item-name').filter({hasText: name}),
        });

        await expect(productItem).toHaveCount(this.EXPECTED_COUNT);
        await expect(productItem.getByTestId('inventory-item-name')).toHaveText(name);
        await expect(productItem.getByTestId('inventory-item-price')).toHaveText(price);
        await expect(productItem.getByTestId('item-quantity')).toHaveText(String(quantity));
    }
}
