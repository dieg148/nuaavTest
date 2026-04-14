import { test as base, Page } from '@playwright/test';
import { login } from '../utils/auth';

type MyOptions = {
  username: string;
  password: string;
};

type MyFixtures = {
  loggedInPage: Page;
  inventoryPage: Page;
};

export const test = base.extend<MyOptions & MyFixtures>({
	username: [undefined as unknown as string, { option: true }],
	password: [undefined as unknown as string, { option: true }],

	loggedInPage: async ({ page, username, password }, use) => {
		await login(
			page,
			username,
			password
		);
		await use(page);
	},
	inventoryPage: async ({ page }, use) => {
		await page.goto('/inventory.html');
		await use(page);
	}

});


export const expect = test.expect;