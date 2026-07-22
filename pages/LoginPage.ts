import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[name="submitLogin"]');
  }

  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(1000);
    await this.loginButton.click();

    await this.page.waitForURL(url => !url.toString().includes('/login'), { timeout: 20000 });

    await this.page.screenshot({ path: 'after-login.png', fullPage: true });
  }
}