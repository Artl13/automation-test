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

test('Verify Newsrael article navigation', async ({ page }) => {
  // Increase timeout for this specific test due to potential long scrolling
  test.setTimeout(480000); 

  try {
    Logger.info('Starting Newsrael article navigation test');

    Logger.info('Navigating to Newsrael homepage');
    await page.goto('https://www.newsrael.com/');
    Logger.info('Landed on Newsrael homepage');

    Logger.info('Waiting before handling popups');
    await page.waitForTimeout(2000);

    Logger.info('Closing popup for downloading the apps if present');
    await page.getByRole('button', { name: '×' }).click();

    // Define the target article link
    const articleLink = page.getByRole('link', { name: 'Trump: MSNBC should pay for ‘unpardonable sin’ done to US' });

    Logger.info('Starting scroll to find article: "Trump: MSNBC should pay for ‘unpardonable sin’ done to US"');
    
    // Scroll until article is found or max attempts reached
    let maxScrollAttempts = 1000;
    let scrollCount = 0;
    let articleVisible = false;

    while (scrollCount < maxScrollAttempts && !articleVisible) {
      // Check if article is visible
      articleVisible = await articleLink.isVisible({ timeout: 1000 }).catch(() => false);

      if (articleVisible) {
        Logger.info('Article found after scrolling');
        await articleLink.scrollIntoViewIfNeeded(); // Ensure it's fully in view
        break;
      }

      // Scroll down
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      scrollCount++;
      Logger.info(`Scroll attempt ${scrollCount}/${maxScrollAttempts}`);

      // Wait for potential lazy loading
      await page.waitForTimeout(1000); // Adjust timing based on loader speed
    }

    if (!articleVisible) {
      Logger.warn('Article not found after maximum scroll attempts');
      throw new Error('Target article "Trump: MSNBC should pay for ‘unpardonable sin’ done to US not found after scrolling');
    }

    Logger.info('Clicking article link: "Trump: MSNBC should pay for ‘unpardonable sin’ done to US"');
    await articleLink.click();

    Logger.info('Test completed successfully');

  } catch (error) {
    Logger.error(`Test failed with error: ${JSON.stringify(error)}`);
    Logger.info('Capturing screenshot of failure');
    try {
      await page.screenshot({ path: 'failure-screenshot.png', timeout: 5000 });
    } catch (screenshotError) {
      Logger.error(`Failed to capture screenshot: ${JSON.stringify(screenshotError)}`);
    }
    throw error;
  }
});