import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';

export class LoginPage extends BasePage {

    readonly path = '';
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    protected readonly pageAnchor: Locator;

    constructor(page: Page) {
        super(page);

        this.userNameInput = this.page.getByTestId('username');
        this.passwordInput = this.page.getByTestId('password');
        this.loginButton = this.page.getByTestId('login-button');
        this.pageAnchor = this.loginButton;
    }

    async openLoginForm(): Promise<void> {
        await this.openPage();
        await this.expectPageLoaded();
    }

    async signIn(username: string, password: string) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}
