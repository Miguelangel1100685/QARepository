const { By, until } = require('selenium-webdriver');

class TextBoxPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://demoqa.com/text-box';
  }

  async visit() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(By.id('userName')), 5000);
  }

  async fillTextBox(name, email, currentAddress, permanentAddress) {
    await this.driver.findElement(By.id('userName')).sendKeys(name);
    await this.driver.findElement(By.id('userEmail')).sendKeys(email);
    await this.driver.findElement(By.id('currentAddress')).sendKeys(currentAddress);
    await this.driver.findElement(By.id('permanentAddress')).sendKeys(permanentAddress);
    await this.driver.findElement(By.id('submit')).click();
  }

  async assertOutput(name, email, currentAddress, permanentAddress) {
    const nameOutput = await this.driver.findElement(By.id('name')).getText();
    const emailOutput = await this.driver.findElement(By.id('email')).getText();
    const currentAddressOutput = await this.driver.findElement(By.css('#output #currentAddress')).getText();
    const permanentAddressOutput = await this.driver.findElement(By.css('#output #permanentAddress')).getText();

    if (!nameOutput.includes(name) || !emailOutput.includes(email) ||
        !currentAddressOutput.includes(currentAddress) || !permanentAddressOutput.includes(permanentAddress)) {
      throw new Error('Los valores de salida no coinciden con los valores ingresados.');
    }
  }
}

module.exports = TextBoxPage;