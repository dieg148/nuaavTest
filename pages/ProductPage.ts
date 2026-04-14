import { Page, Locator } from "@playwright/test";
import { expect } from '@playwright/test';


export default class ProductPage {

	readonly page: Page

	constructor(page: Page){
			this.page = page;
	}

	private commonElements = {
		getInventoryList:() => this.page.locator('[data-test="inventory-list"]'),
		getInventoryItem:() => this.page.locator('[data-test="inventory-item"]'),
		getItemsName:() => this.page.locator('.inventory_item_name'),
		getItemsPrice:() => this.page.locator('.inventory_item_price'),
		getItemName: (item: Locator) =>
			item.locator('[data-test="inventory-item-name"]'),
		getItemPrice: (item: Locator) =>
			item.locator('[data-test="inventory-item-price"]'),
		getItemImg: (item: Locator) =>
			item.locator('img[class="inventory_item_img"]'),
		getAddButton: (item: Locator) =>
			item.getByRole('button', { name: "Add to cart"}),
		getTitle: () => this.page.locator('[data-test="title"]'),
		getFilter: () => this.page.locator('[class="select_container"] select'),
		getCar:() => this.page.locator('#shopping_cart_container span')
			

	}

	public async goto() {
		await this.page.goto('/inventory.html');
	}

	async goToCart() {
		await this.commonElements.getCar().click();
	}

	async validateProducts(products: number){
		await this.commonElements.getInventoryList().waitFor();
		const items = this.commonElements.getInventoryItem();
		const count = await items.count();
		expect(count).toEqual(products);
		for (let i = 0; i < count; i++) {
			const item = items.nth(i);
			await expect(this.commonElements.getItemName(item)).toBeVisible();
			await expect(this.commonElements.getItemPrice(item)).toBeVisible();
			await expect(this.commonElements.getAddButton(item)).toBeVisible()
			const img = this.commonElements.getItemImg(item);
			const isLoaded = await img.evaluate((img: HTMLImageElement) => {
				return img.complete && img.naturalWidth > 0;
			});
			expect(isLoaded).toBeTruthy();
		}

	}

	public async sortByOption(option: 'az' | 'za' | 'lohi' | 'hilo') {
		await this.commonElements.getFilter().selectOption(option)
	}

	public async validateSortByOption(option: 'az' | 'za' | 'lohi' | 'hilo') {
		let text = await this.commonElements.getItemsName().allTextContents();
		if (['lohi', 'hilo'].includes(option)) {
			text = await this.commonElements.getItemsPrice().allTextContents();
		}
		const prices = await this.commonElements.getItemsName().allTextContents();
		const nums = prices.map(p => parseFloat(p.replace('$', '')));
		if (['lohi', 'az'].includes(option)) {
			expect(nums).toEqual([...nums].sort((a, b) => a - b));

		}  else {
			expect(nums).toEqual([...nums].sort((a, b) => a + b));

		}
	}
	
	public async addToCart(option: string) {
		await this.commonElements.getInventoryItem()
      .filter({ hasText: option })
      .getByRole('button', { name: /add to cart/i })
      .click();
	}

	public async removFromCart(option: string) {
		await this.commonElements.getInventoryItem()
      .filter({ hasText: option })
      .getByRole('button', { name: /Remove/i })
      .click();
	}

	public async validateCartCount(option: number) {
		const cart = this.commonElements.getCar();
		if (option === 0) {
			await expect(cart).toHaveCount(0);
		} else {
			await expect(cart).toHaveText(`${option}`);
		}
	}

	

}