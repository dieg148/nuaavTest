import { test } from '../../fixtures/base.fixture';
import LoginPage  from "../../pages/LoginPage";

test.describe('Test locked out user login', () => {
	test.use({ username: process.env.LOCKED_USER, password: process.env.PASSWORD, storageState: undefined });
	test('validate the locked out user displayed an error', async ({page, loggedInPage}) => {
		const loginPage = new LoginPage(page);
		// Check the error message
		await loginPage.expectErrorMessage('Sorry, this user has been locked out.');
	});

});

test.describe('Test non exists user login', () => {
	test.use({ username: "nonexistsuser", password: process.env.PASSWORD, storageState: undefined });
	test('validate error when a non exist user try to login', async ({page, loggedInPage}) => {
		const loginPage = new LoginPage(page);
		// Check the error message
		await loginPage.expectErrorMessage('Username and password do not match any user in this service');
	});
});

test.describe('Test wrong password login', () => {
	test.use({ username:  process.env.STANDARD_USER, password:'wrongPassword', storageState: undefined });
	test('validate error using a wrong password to login', async ({page, loggedInPage}) => {
		const loginPage = new LoginPage(page);
		// Check the error message
		await loginPage.expectErrorMessage('Username and password do not match any user in this service');
	});
});