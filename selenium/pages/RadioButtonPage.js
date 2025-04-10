const { By, until } = require('selenium-webdriver');

class RadioButtonPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://demoqa.com/radio-button';
  }

  async visit() {
    await this.driver.get(this.url);
    await this.driver.wait(until.titleContains('DEMOQA'), 30000);
    await this.driver.wait(until.elementLocated(By.className('mb-3')), 30000);
  }

  async selectOption(option) {
    const options = {
      yes: 'yesRadio',
      impressive: 'impressiveRadio',
      no: 'noRadio', // Este no se puede clicar por defecto
    };

    const optionId = options[option.toLowerCase()];
    if (!optionId) throw new Error(`Opción "${option}" no válida.`);

    const label = await this.driver.findElement(By.css(`label[for="${optionId}"]`));
    await this.driver.executeScript('arguments[0].click();', label);
  }

  async assertOptionSelected(expectedText) {
    const result = await this.driver.findElement(By.className('text-success')).getText();
    if (result !== expectedText) {
      throw new Error(`Resultado esperado: "${expectedText}", pero se obtuvo: "${result}"`);
    }
  }
}

module.exports = RadioButtonPage;
