const { Builder } = require('selenium-webdriver');
const CheckBoxPage = require('../pages/CheckBoxPage'); // Ruta correcta
const takeScreenshot = require('../utils/screenshotHelper'); // Ruta correcta
const path = require('path');

(async function runCheckBoxTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const checkBoxPage = new CheckBoxPage(driver);

  try {
    console.log('🧪 Iniciando prueba de Check Box...');

    // Navegar a la página
    await checkBoxPage.visit();

    // Expandir todos los nodos
    await checkBoxPage.expandAll();

    // Seleccionar el checkbox "Home"
    await checkBoxPage.selectHomeCheckbox();

    // Verificar que el checkbox "Home" esté seleccionado
    await checkBoxPage.assertSelectedCheckbox('home');

    console.log('✅ Prueba de Check Box completada con éxito.');
  } catch (error) {
    console.error('❌ Error en la prueba de Check Box:', error.message);

    // Toma un screenshot en caso de error
    const screenshotPath = path.join(__dirname, 'screenshots', `error-checkBox-${timestamp}.png`);
    await takeScreenshot(driver, screenshotPath);
    console.log(`📸 Screenshot guardado en: ${screenshotPath}`);
  } finally {
    // Cerrar el navegador
    await driver.quit();
    console.log('🚗 Driver cerrado. Prueba finalizada.');
  }
})();
