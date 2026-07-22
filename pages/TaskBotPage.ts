import { Page, Locator } from '@playwright/test';

export class TaskBotPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly runButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[aria-label="Search"]');
    this.runButton = page.locator('button[name="run"]').first();
  }

  async gotoBots() {
    await this.page.goto('https://community.cloud.automationanywhere.digital/#/bots/repository/private/folders/33031949', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    await this.page.waitForTimeout(2000);
  }

  async searchBot(botName: string) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.searchInput.fill(botName);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(1500);
  }

  async openBot(botName: string) {
    await this.page.getByRole('link', { name: botName, exact: true }).click();
    await this.page.waitForTimeout(4000);
  }

  async clickRun() {
    await this.runButton.click({ timeout: 20000 });
    await this.page.waitForTimeout(2000);
  }
}