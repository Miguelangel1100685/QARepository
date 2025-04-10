const { Builder, By } = require('selenium-webdriver');
const TextBoxPage = require('../pages/TextBoxPage');

(async function runTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  const textBoxPage = new TextBoxPage(driver);

  try {
    // Datos de prueba
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const currentAddress = '123 Main St';
    const permanentAddress = '456 Elm St';

    // Navegar a la página
    await textBoxPage.visit();

    // Llenar el formulario
    await textBoxPage.fillTextBox(name, email, currentAddress, permanentAddress);

    // Verificar la salida
    await textBoxPage.assertOutput(name, email, currentAddress, permanentAddress);

    console.log('Test passed: Los valores de salida coinciden con los valores ingresados.');
  } catch (error) {
    console.error('Test failed:', error.message);
  } finally {
    // Cerrar el navegador
    await driver.quit();
  }
})();

TextBoxPage.prototype.fillTextBox = async function(name, email, currentAddress, permanentAddress) {
  await this.driver.findElement(By.id('userName')).sendKeys(name);
  await this.driver.findElement(By.id('userEmail')).sendKeys(email);
  await this.driver.findElement(By.id('currentAddress')).sendKeys(currentAddress);
  await this.driver.findElement(By.id('permanentAddress')).sendKeys(permanentAddress);

  // Manejar iframes (si existen)
  const iframes = await this.driver.findElements(By.tagName('iframe'));
  if (iframes.length > 0) {
    await this.driver.switchTo().frame(iframes[0]);
    console.log('Switched to iframe to handle ads.');
    await this.driver.switchTo().defaultContent();
  }

  // Desplazarse al botón y forzar clic
  const submitButton = await this.driver.findElement(By.id('submit'));
  await this.driver.executeScript('arguments[0].scrollIntoView(true);', submitButton);
  await this.driver.executeScript('arguments[0].click();', submitButton);
};