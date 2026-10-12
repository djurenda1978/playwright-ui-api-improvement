import {type Page, type Locator} from '@playwright/test';
import {BasePage} from './BasePage';
import {ProductList} from './common/ProductList';

export class CartPage extends BasePage {
    readonly path = '/cart.html';
    protected readonly pageAnchor: Locator;
    private readonly productList: ProductList;
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.pageAnchor = page.getByTestId('cart-list');
        this.productList = new ProductList(page);
        this.checkoutButton = page.getByTestId('checkout');
    }

    async expectProductCart(name: string, price: string, quantity: number): Promise<void> {
        await this.productList.expectProduct(name, price, quantity);
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
