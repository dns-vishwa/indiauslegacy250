const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('http://localhost:5173/');
  
  try {
    // Wait for the Enter button and click it
    await page.waitForSelector('button', { text: /Enter/i, timeout: 5000 });
    // Find the button that has "Enter Here."
    const buttons = await page.$$('button');
    for (let btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes("Enter Here")) {
        console.log("Clicking Enter button...");
        await btn.click();
        break;
      }
    }
  } catch(e) {
    console.log("Could not find or click enter button", e.message);
  }

  // Wait some time to capture logs
  await new Promise(r => setTimeout(r, 5000));
  
  await browser.close();
})();
