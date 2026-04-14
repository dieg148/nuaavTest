import { test } from '../../fixtures/base.fixture';
import ProductPage  from "../../pages/ProductPage";



test.describe('validate Products', () => {
	let productPage: ProductPage;
	test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.goto();
  });

	test('validates the product grid', async ({ }) => {
		// Check displayed products
		 await productPage.validateProducts(6);
	});

	type SortPriceOption = 'hilo' | 'lohi';
	const priceOptions: SortPriceOption[] = ['hilo', 'lohi'];

	for (const option of priceOptions) {
		test(`sort by price - ${option}`, async ({ }) => {
			await productPage.goto();
			await productPage.sortByOption(option);
			await productPage.validateSortByOption(option);
		});
	}

	type SortNameOptions = 'az' | 'za';
	const nameOptions: SortNameOptions[] = ['az', 'za'];

	for (const option of priceOptions) {
		test(`sort by name - ${option}`, async ({ }) => {
			await productPage.goto();
			await productPage.sortByOption(option);
			await productPage.validateSortByOption(option);
		});
	}
});

test.describe('car funtionality', () => {

	let productPage: ProductPage;

	test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.goto();
  });

	// let says we have all products and try to add/remove them
		const products = [
			'Sauce Labs Backpack',
			'Sauce Labs Bike Light',
			'Sauce Labs Bolt T-Shirt',
			'Sauce Labs Fleece Jacket',
			'Sauce Labs Onesie',
			'Test.allTheThings() T-Shirt (Red)'
		];

	test('add/remove items to cart', async ({ }) => {
		// Check the add functionality
		let count = 0;
		for (const product of products) {
			await productPage.addToCart(product);
			count++;
			await productPage.validateCartCount(count);
		}
		// Check the remove functionality
		for (const product of products) {
			await productPage.removFromCart(product);
			count--;
			await productPage.validateCartCount(count);
		}
	});

});
