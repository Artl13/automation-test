import { test, expect } from '@playwright/test';

// Simple Logger class
class Logger {
  static info(message) {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`);
  }
  
  static error(message) {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`);
  }
  
  static warn(message) {
    console.warn(`[WARN] [${new Date().toISOString()}] ${message}`);
  }
}

test('search_result', async ({ page }) => {
  test.setTimeout(120000);

  try {
    Logger.info('Starting search result test');

    Logger.info('Navigating to website');
    await page.goto('https://www.vaza.co.il/');

    Logger.info('Closing popup');
    await page.getByRole('button', { name: 'סגור' }).click();

    Logger.info('Opening search bar');
    await page.getByRole('banner').getByRole('button').filter({ hasText: /^$/ }).click();

    Logger.info('Entering search query');
    await page.getByRole('textbox', { name: 'מה תרצו לחפש?' }).click();
    await page.getByRole('textbox', { name: 'מה תרצו לחפש?' }).fill('זר');
    Logger.info('Filled search with "זר"');

    Logger.info('Submitting search');
    await page.getByRole('button', { name: 'Submit' }).click();

    Logger.info('Selecting first search result');
    await page.locator('.image_block').first().click();
    Logger.info('Clicked first result image');

    Logger.info('Test completed successfully');

  } catch (error) {
    Logger.error(`Test failed with error: ${JSON.stringify(error)}`);
    Logger.info('Capturing screenshot of failure');
    await page.screenshot({ path: 'failure-screenshot.png' });
    throw error;
  }
});