const { Builder } = require('selenium-webdriver');
const path = require('path');

// Importar páginas
const TextBoxPage = require('../pages/TextBoxPage');
const CheckBoxPage = require('../pages/CheckBoxPage');
const RadioButtonPage = require('../pages/RadioButtonPage');
const WebTablesPage = require('../pages/WebTablesPage');
const ButtonsPage = require('../pages/ButtonsPage');

// Helpers
const takeScreenshot = require('../utils/screenshotHelper');

(async function runTests() {
  const driver = await new Builder().forBrowser('chrome').build();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const testResults = []; // Arreglo para almacenar los resultados de las pruebas

  try {
    console.log('🧪 Iniciando pruebas...\n');

    // Prueba de TextBox
    try {
      const textBoxPage = new TextBoxPage(driver);
      await textBoxPage.visit();
      await textBoxPage.fillTextBox('John Doe', 'johndoe@example.com', '123 Main St', '456 Elm St');
      await textBoxPage.assertOutput('John Doe', 'johndoe@example.com', '123 Main St', '456 Elm St');
      testResults.push({ test: 'TextBox Test', status: 'PASSED' });
    } catch (error) {
      testResults.push({ test: 'TextBox Test', status: 'FAILED', error: error.message });

      // Toma un screenshot en caso de error
      const screenshotPath = path.join(__dirname, 'screenshots', `error-textBox-${timestamp}.png`);
      await takeScreenshot(driver, screenshotPath);
      console.log(`📸 Screenshot guardado en: ${screenshotPath}`);
    }

    // Prueba de CheckBox
    try {
      const checkBoxPage = new CheckBoxPage(driver);
      await checkBoxPage.visit();
      await checkBoxPage.expandAll();
      await checkBoxPage.selectHomeCheckbox();
      await checkBoxPage.assertSelectedCheckbox('home');
      testResults.push({ test: 'CheckBox Test', status: 'PASSED' });
    } catch (error) {
      testResults.push({ test: 'CheckBox Test', status: 'FAILED', error: error.message });

      // Toma un screenshot en caso de error
      const screenshotPath = path.join(__dirname, 'screenshots', `error-checkBox-${timestamp}.png`);
      await takeScreenshot(driver, screenshotPath);
      console.log(`📸 Screenshot guardado en: ${screenshotPath}`);
    }

    // Prueba de RadioButton
    try {
      const radioButtonPage = new RadioButtonPage(driver);
      await radioButtonPage.visit();
      await radioButtonPage.selectOption('Yes');
      await radioButtonPage.assertOptionSelected('Yes');
      testResults.push({ test: 'RadioButton Test (Yes)', status: 'PASSED' });

      // Prueba adicional para "No" (fallará intencionalmente)
      await radioButtonPage.selectOption('No');
      await radioButtonPage.assertOptionSelected('No');
      testResults.push({ test: 'RadioButton Test (No)', status: 'PASSED' });
    } catch (error) {
      testResults.push({ test: 'RadioButton Test', status: 'FAILED', error: error.message });

      // Toma un screenshot en caso de error
      const screenshotPath = path.join(__dirname, 'screenshots', `error-radioButton-${timestamp}.png`);
      await takeScreenshot(driver, screenshotPath);
      console.log(`📸 Screenshot guardado en: ${screenshotPath}`);
    }

    // Prueba de Web Tables
    try {
      const webTablesPage = new WebTablesPage(driver);
      await webTablesPage.visit();
      await webTablesPage.addNewRecord('John', 'Doe', 'johndoe@example.com', '30', '50000', 'Engineering');
      await webTablesPage.searchRecord('John');
      await webTablesPage.assertRecordExists('John');
      testResults.push({ test: 'Web Tables Test', status: 'PASSED' });
    } catch (error) {
      testResults.push({ test: 'Web Tables Test', status: 'FAILED', error: error.message });

      // Toma un screenshot en caso de error
      const screenshotPath = path.join(__dirname, 'screenshots', `error-webTables-${timestamp}.png`);
      await takeScreenshot(driver, screenshotPath);
      console.log(`📸 Screenshot guardado en: ${screenshotPath}`);
    }

    // Prueba de Buttons
    try {
      const buttonsPage = new ButtonsPage(driver);
      await buttonsPage.visit();
      await buttonsPage.doubleClickButton();
      await buttonsPage.rightClickButton();
      await buttonsPage.assertMessage('You have done a right click');
      await buttonsPage.clickButton();
      testResults.push({ test: 'Buttons Test', status: 'PASSED' });
    } catch (error) {
      testResults.push({ test: 'Buttons Test', status: 'FAILED', error: error.message });

      // Toma un screenshot en caso de error
      const screenshotPath = path.join(__dirname, 'screenshots', `error-buttons-${timestamp}.png`);
      await takeScreenshot(driver, screenshotPath);
      console.log(`📸 Screenshot guardado en: ${screenshotPath}`);
    }
  } catch (error) {
    console.error('❌ Error general en las pruebas:', error.message);

    // Toma un screenshot en caso de error general
    const screenshotPath = path.join(__dirname, 'screenshots', `error-${timestamp}.png`);
    await takeScreenshot(driver, screenshotPath);
    console.log(`📸 Screenshot guardado en: ${screenshotPath}`);
  } finally {
    // Mostrar el resumen de las pruebas
    console.log('\n📋 Resumen de las pruebas:');
    testResults.forEach((result, index) => {
      console.log(`\nPrueba ${index + 1}: ${result.test}`);
      if (result.status === 'PASSED') {
        console.log(`✅ Estado: ${result.status}`);
      } else {
        console.log(`❌ Estado: ${result.status}`);
        console.log(`   Error: ${result.error}`);
      }
    });

    // Cerrar el navegador
    await driver.quit();
    console.log('\n🚗 Driver cerrado. Pruebas finalizadas.');
  }
})();