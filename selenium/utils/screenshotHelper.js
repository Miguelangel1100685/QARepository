const fs = require('fs');

async function takeScreenshot(driver, filePath) {
  const screenshot = await driver.takeScreenshot();
  fs.mkdirSync(require('path').dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, screenshot, 'base64');
}

module.exports = takeScreenshot;