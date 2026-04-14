import { Page } from "@playwright/test";
import { expect } from '@playwright/test';


export default class LoginPage {

    readonly page: Page

    constructor(page: Page){
			this.page = page;
    }

    private commonElements = {
			getUserName:() => this.page.locator('#user-name'),
			getPassword:() => this.page.locator('#password'),
			getSubmitButton: () => this.page.getByRole('button', { name: 'Login' }),
			getErrorMessage: () => this.page.locator('[class*="error-message-container"] h3')

    }

    public async goto() {
			await this.page.goto('/');
    }

    async fillData(user: string, password: string){
			await this.commonElements.getUserName().fill(user);
			await this.commonElements.getPassword().fill(password);
    }

    public async submit() {
			await this.commonElements.getSubmitButton().click();
    }

    public async expectErrorMessage(message: string) {
			await expect(this.commonElements.getErrorMessage()).toContainText(message);
    }

}