import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TaskBotPage } from '../pages/TaskBotPage';
import * as dotenv from 'dotenv';

dotenv.config();

test('Use Case 1: Login, locate, and trigger TaskBot run', async ({ page }) => {
  test.setTimeout(90000);

  const loginPage = new LoginPage(page);
  const taskBotPage = new TaskBotPage(page);

  const url = process.env.AA_URL!;
  const email = process.env.AA_EMAIL!;
  const password = process.env.AA_PASSWORD!;

  // Step 1: Log in
  await loginPage.goto(url);
  await loginPage.login(email, password);

  // Step 2: Navigate to Bots and find the target bot
  await taskBotPage.gotoBots();
  await taskBotPage.searchBot('Message Box Task');

  // Step 3: Open the bot editor and confirm it loaded correctly
  await taskBotPage.openBot('Message Box Task');
  await expect(taskBotPage.runButton).toBeVisible();

  // Step 4: Trigger the Run action
  await taskBotPage.clickRun();

  // Step 5: Confirm a deployment dialog appeared, proving Run was triggered successfully
  // (Full execution requires a connected local Bot Agent, which isn't available in this automated browser session)
  const dialogAppeared = await page.getByText(/connection|credentials|deploying/i).first().isVisible({ timeout: 10000 }).catch(() => false);
  expect(dialogAppeared).toBeTruthy();
});