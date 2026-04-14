import { test as setup } from '@playwright/test';
import { login } from '../utils/auth';
import dotenv from 'dotenv';

dotenv.config();

setup('authenticate', async ({ page }) => {
  await login(
    page,
    process.env.STANDARD_USER!,
    process.env.PASSWORD!
  );
  // Validate the login was completed
  await page.waitForURL('**/inventory.html');
  // Save storage state
  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
});