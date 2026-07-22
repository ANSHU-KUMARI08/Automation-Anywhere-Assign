import { Page, Locator } from '@playwright/test';

export class MessageBoxPage {
  readonly page: Page;
  readonly successTitle: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successTitle = page.locator('span.message__title');
    this.closeButton = page.locator('button[name="ok"]');
  }

  async getSuccessText(): Promise<string> {
    await this.successTitle.waitFor({ state: 'visible', timeout: 60000 });
    return (await this.successTitle.textContent()) ?? '';
  }

  async close() {
    await this.closeButton.click();
  }
}