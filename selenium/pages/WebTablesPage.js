const { By, until } = require('selenium-webdriver');

class WebTablesPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://demoqa.com/webtables';
  }

  async visit() {
    await this.driver.get(this.url);
    await this.driver.wait(until.titleIs('DEMOQA'), 10000);
  }

  async addNewRecord(firstName, lastName, email, age, salary, department) {
    await this.driver.findElement(By.id('addNewRecordButton')).click();
    await this.driver.findElement(By.id('firstName')).sendKeys(firstName);
    await this.driver.findElement(By.id('lastName')).sendKeys(lastName);
    await this.driver.findElement(By.id('userEmail')).sendKeys(email);
    await this.driver.findElement(By.id('age')).sendKeys(age);
    await this.driver.findElement(By.id('salary')).sendKeys(salary);
    await this.driver.findElement(By.id('department')).sendKeys(department);
    await this.driver.findElement(By.id('submit')).click();
  }

  async searchRecord(searchTerm) {
    const searchBox = await this.driver.findElement(By.id('searchBox'));
    await searchBox.clear();
    await searchBox.sendKeys(searchTerm);
  }

  async assertRecordExists(expectedValue) {
    const rows = await this.driver.findElements(By.css('.rt-tbody .rt-tr-group'));
    for (const row of rows) {
      const text = await row.getText();
      if (text.includes(expectedValue)) {
        return true;
      }
    }
    throw new Error(`Record with value "${expectedValue}" not found.`);
  }
}

module.exports = WebTablesPage;