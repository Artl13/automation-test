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

test('Verify social media links from JOBx preprod', async ({ page }) => {
  try {
    Logger.info('Starting social media links verification test');

    // Navigate to the JOBx preprod site
    Logger.info('Navigating to JOBx preprod site');
    await page.goto('https://jobx-preprod.prpl.global/');
    Logger.info('Landed on JOBx preprod homepage');

    // Click "מידע כללי" link
    Logger.info('Clicking on "מידע כללי" link');
    await page.getByRole('link', { name: 'מידע כללי' }).click();
    Logger.info('Navigated to "מידע כללי" section');

    // TikTok link
    Logger.info('Clicking on TikTok icon');
    const page1Promise = page.waitForEvent('popup', { timeout: 15000 });
    await page.getByRole('link', { name: 'tiktok icon' }).click();
    const page1 = await page1Promise;
    const tiktokUrl = await page1.url();
    Logger.info(`TikTok popup opened with URL: ${tiktokUrl}`);
    await expect(tiktokUrl).toContain('tiktok.com');
    Logger.info('TikTok URL verified successfully');

    // Instagram link
    Logger.info('Clicking on Instagram icon');
    const page2Promise = page.waitForEvent('popup', { timeout: 15000 });
    await page.getByRole('link', { name: 'instagram icon' }).click();
    const page2 = await page2Promise;
    const instagramUrl = await page2.url();
    Logger.info(`Instagram popup opened with URL: ${instagramUrl}`);
    await expect(instagramUrl).toContain('instagram.com');
    Logger.info('Instagram URL verified successfully');

    // Facebook link
    Logger.info('Clicking on Facebook icon');
    const page3Promise = page.waitForEvent('popup', { timeout: 15000 });
    await page.getByRole('link', { name: 'facebook icon' }).click();
    const page3 = await page3Promise;
    const facebookUrl = await page3.url();
    Logger.info(`Facebook popup opened with URL: ${facebookUrl}`);
    await expect(facebookUrl).toContain('facebook.com');
    Logger.info('Facebook URL verified successfully');

    // YouTube link
    Logger.info('Clicking on YouTube icon');
    const page4Promise = page.waitForEvent('popup', { timeout: 15000 });
    await page.getByRole('link', { name: 'youtube icon' }).click();
    const page4 = await page4Promise;
    const youtubeUrl = await page4.url();
    Logger.info(`YouTube popup opened with URL: ${youtubeUrl}`);
    await expect(youtubeUrl).toContain('youtube.com');
    Logger.info('YouTube URL verified successfully');

    Logger.info('Test completed successfully');

  } catch (error) {
    Logger.error(`Test failed with error: ${JSON.stringify(error)}`);
    Logger.info('Capturing screenshot of failure');
    await page.screenshot({ path: 'failure-screenshot.png' });
    throw error; // Re-throw to ensure test fails and reports the error
  }
});
