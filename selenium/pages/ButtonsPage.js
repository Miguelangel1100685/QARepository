const { By, until } = require('selenium-webdriver');

class ButtonsPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://demoqa.com/buttons';
  }

  async visit() {
    await this.driver.get(this.url);
    await this.driver.wait(until.titleIs('DEMOQA'), 10000);
  }

  async doubleClickButton() {
    const button = await this.driver.findElement(By.id('doubleClickBtn'));
    await this.driver.actions().doubleClick(button).perform();
  }

  async rightClickButton() {
    const button = await this.driver.findElement(By.id('rightClickBtn'));
    await this.driver.actions().contextClick(button).perform();
  }

  async clickButton() {
    const button = await this.driver.findElement(By.xpath('//button[text()="Click Me"]'));
    await button.click();
  }

  async assertMessage(expectedMessage) {
    const message = await this.driver.findElement(By.id('doubleClickMessage')).getText();
    if (!message.includes(expectedMessage)) {
      throw new Error(`Expected message "${expectedMessage}", but got "${message}"`);
    }
  }
}

module.exports = ButtonsPage;