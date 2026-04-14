import { test } from '../../fixtures/base.fixture';
import ProductPage  from "../../pages/ProductPage";
import { expect } from '@playwright/test';



test.describe('validate Products', () => {
	let productPage: ProductPage;
	test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.goto();
  });

	test('validates the product grid', async ({ page }) => {

		await productPage.addToCart('Sauce Labs Fleece Jacket');
    await productPage.goToCart();

    // Steps to checkout. Apologies I was short of time, 
		// in order to create it properl, using POM to those pages 
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('First Name').fill('Diego');
    await page.getByPlaceholder('Last Name').fill('Gil');
    await page.getByPlaceholder('Zip/Postal Code').fill('110101');
    await page.locator('#continue').click();
    // Confirm
    await expect(page.locator('.summary_info')).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();

    // Verify success
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
		await expect(page.locator('[data-test="complete-text"]')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
	});

});
