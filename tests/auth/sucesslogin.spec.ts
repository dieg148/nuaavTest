import { test } from '../../fixtures/base.fixture';
import { expect } from '@playwright/test';

test.describe('Test sucess login', () => {
	test.use({ username: process.env.LOCKED_USER, password: process.env.PASSWORD, storageState: undefined });
	test('standard user can login', async ({ page, context, inventoryPage }) => {
		// Check the first page after login
		await expect(page).toHaveURL('/inventory.html');
		await expect(page.locator('.title')).toHaveText('Products')
		// Check the session-username, it should has the user name
		const cookies = await context.cookies();
		const sessionCookie = cookies.find(c => c.name === 'session-username');
		expect(sessionCookie).toBeDefined();
		expect(sessionCookie?.value).toBe(process.env.STANDARD_USER);
	});
});
