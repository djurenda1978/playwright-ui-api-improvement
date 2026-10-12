import {expect, type Page, type Locator} from '@playwright/test';
import {BasePage} from './BasePage';

export interface CheckoutInformation {
    firstName: string;
    lastName: string;
    postalCode: string;
}

export class CheckOutYourInfoPage extends BasePage {
    readonly path = '/checkout-step-one.html';
    protected readonly pageAnchor: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);

        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.pageAnchor = page.getByTestId('checkout-info-container');
    }

    async fillYourInformation(userData: CheckoutInformation): Promise<void> {
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.postalCodeInput.fill(userData.postalCode);
    }

    async expectYourInformation(userData: CheckoutInformation): Promise<void> {
        await expect(this.firstNameInput).toHaveValue(userData.firstName);
        await expect(this.lastNameInput).toHaveValue(userData.lastName);
        await expect(this.postalCodeInput).toHaveValue(userData.postalCode);
    }

    async continueToOverview(): Promise<void> {
        await this.continueButton.click();
    }
}
