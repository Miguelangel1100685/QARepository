const { By, until } = require('selenium-webdriver');

class CheckBoxPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://demoqa.com/checkbox';
  }

  async visit() {
    await this.driver.get(this.url);

    // Depuración: Verifica el título actual de la página
    const actualTitle = await this.driver.getTitle();
    console.log('Título actual de la página:', actualTitle);

    // Espera a que el título sea "DEMOQA"
    await this.driver.wait(until.titleIs('DEMOQA'), 20000);
  }

  async expandAll() {
    const expandButton = await this.driver.findElement(By.css('.rct-collapse-btn'));
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', expandButton);
    await this.driver.executeScript('arguments[0].click();', expandButton);
  }

  async selectHomeCheckbox() {
    const homeCheckbox = await this.driver.findElement(By.css('.rct-checkbox'));
    await homeCheckbox.click();
  }

  async assertSelectedCheckbox(expectedValue) {
    const result = await this.driver.findElement(By.id('result')).getText();
    if (!result.includes(expectedValue)) {
      throw new Error(`Expected "${expectedValue}" to be selected, but got "${result}"`);
    }
  }
}

module.exports = CheckBoxPage;
