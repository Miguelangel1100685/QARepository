const { By, until } = require('selenium-webdriver');

class ButtonsPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://demoqa.com/buttons';
  }

  async visit() {
    await this.driver.get(this.url);
  }

  async clickButton() {
    const clickButton = await this.driver.findElement(By.xpath('//button[text()="Click Me"]'));
    await clickButton.click();
  }

  async assertMessage(expectedMessage) {
    const messageElement = await this.driver.wait(until.elementLocated(By.css('#dynamicClickMessage')), 5000);
    const actualMessage = await messageElement.getText();

    if (actualMessage !== expectedMessage) {
      throw new Error(`Expected message "${expectedMessage}", but got "${actualMessage}".`);
    }
  }
}

module.exports = ButtonsPage;
