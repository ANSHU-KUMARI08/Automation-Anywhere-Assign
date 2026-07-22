import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config();

test('should log in to Automation Anywhere Control Room', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);

  const url = process.env.AA_URL!;
  const email = process.env.AA_EMAIL!;
  const password = process.env.AA_PASSWORD!;

  await loginPage.goto(url);
  await loginPage.login(email, password);
  await expect(page).not.toHaveURL(/login/i);
});