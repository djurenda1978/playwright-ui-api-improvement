import { test } from '@playwright/test';
import { LoginPage } from '@/pages/LoginPage';
import { InventoryPage } from '@/pages/InventoryPage';
import { CartPage } from '@/pages/CartPage';
import { CheckOutYourInfoPage } from '@/pages/CheckOutYourInfoPage';
import { CheckOutOverViewPage } from '@/pages/CheckOutOverViewPage';
import { CheckOutCompletePage } from '@/pages/CheckOutCompletePage';
import { getCredentials } from '@/utils/credentials';
import { userData } from '@/test-data/userData';
import { Given, When, Then, And } from '@/utils/bdd';

test('TEST 4 - Successfully completes a product purchase', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckOutYourInfoPage(page);
    const checkoutOverviewPage = new CheckOutOverViewPage(page);
    const checkoutCompletePage = new CheckOutCompletePage(page);
    // SauceDemo allows each product to be added only once.
    const expectedQuantity = 1;
    const expectedProductCount = 1;
    const productNumber = 1;
    const credentials = getCredentials('STANDARD');

    let selectedProduct: { name: string; price: string };

    await Given('user is logged in to SauceDemo as a standard user', async () => {
        await loginPage.openLoginForm();
        await loginPage.signIn(credentials.username, credentials.password);
        await inventoryPage.expectPageLoaded();
    });

    await When('user adds a product to the shopping cart', async () => {
        // Select a product by its position in the inventory list.
        selectedProduct = await inventoryPage.addProductToCart(productNumber);
        await inventoryPage.expectCartItemCount(expectedProductCount);
    });

    await And('user proceeds to checkout with the selected product', async () => {
        await inventoryPage.openCart();
        await cartPage.expectPageLoaded();
        await cartPage.expectProductCart(selectedProduct.name, selectedProduct.price, expectedQuantity);
        await cartPage.proceedToCheckout();
        await checkoutInfoPage.expectPageLoaded();
    });

    await And('user completes the checkout process', async () => {
        await checkoutInfoPage.fillYourInformation(userData);
        await checkoutInfoPage.expectYourInformation(userData);

        await checkoutInfoPage.continueToOverview();
        await checkoutOverviewPage.expectPageLoaded();

        await checkoutOverviewPage.expectProductOverview(selectedProduct.name, selectedProduct.price, expectedQuantity);
        await checkoutOverviewPage.expectTotalVisible();

        await checkoutOverviewPage.finishCheckout();
    });

    await Then('the order is completed successfully', async () => {
        await checkoutCompletePage.expectPageLoaded();
        await checkoutCompletePage.expectOrderComplete();
        await page.screenshot({
            path: 'docs/screenshots/checkout-success.png',
            fullPage: true,
        });
    });

    await And('user logs out from SauceDemo', async () => {
        await checkoutCompletePage.backToProducts();
        await inventoryPage.expectPageLoaded();

        await inventoryPage.openMenu();
        await inventoryPage.logout();
        await loginPage.expectPageLoaded();
    });
});
