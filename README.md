# QARepository

Este repositorio contiene las pruebas automatizadas realizadas como parte de la Prueba Técnica, cuenta con una carpeta con imagenes de las pruebas, y un documento en la carpeta TestMatrix_DefectReport con la informacion correspondiente. A continuación, se detalla la información sobre las herramientas utilizadas, las buenas prácticas implementadas, las prácticas desechadas, y cómo ejecutar las pruebas.

## Herramientas Utilizadas

### Cypress
- **Descripción**: Framework de pruebas end-to-end para aplicaciones web.
- **Paquetes utilizados**:
  - `cypress`: Para la ejecución de pruebas.
  - `cypress-file-upload`: Para pruebas que requieren carga de archivos.
  - `cypress-xpath`: Para soporte de selectores XPath.
- **Ventajas**:
  - Fácil configuración y uso.
  - Excelente soporte para pruebas en tiempo real.
  - Integración con CI/CD.
- **Errores comunes**:
  - Problemas con selectores dinámicos, solucionados utilizando `cy.xpath`.

### Selenium
- **Descripción**: Herramienta para pruebas automatizadas en múltiples navegadores.
- **Paquetes utilizados**:
  - `selenium-webdriver`: Para la interacción con navegadores.
  - `chromedriver`: Para pruebas en Google Chrome.
  - `geckodriver`: Para pruebas en Firefox.
- **Ventajas**:
  - Soporte para múltiples lenguajes de programación.
  - Compatible con una amplia gama de navegadores.
- **Errores comunes**:
  - Configuración inicial compleja.
  - Problemas de sincronización solucionados con `WebDriverWait`.

### Postman
- **Descripción**: Herramienta para pruebas de APIs.
- **Paquetes utilizados**:
  - No se requieren paquetes adicionales, ya que Postman es una aplicación independiente.
- **Ventajas**:
  - Interfaz gráfica intuitiva.
  - Soporte para pruebas automatizadas con colecciones.
- **Errores comunes**:
  - Problemas con autenticación, solucionados configurando correctamente los encabezados.

## Buenas Prácticas Implementadas
- Uso de selectores estables en Cypress para evitar fallos por cambios en el DOM.
- Implementación de pruebas parametrizadas para cubrir múltiples casos de prueba.
- Uso de `Page Object Model (POM)` para mantener el código organizado y reutilizable.
- Configuración de tiempos de espera explícitos en Selenium para evitar problemas de sincronización.

## Prácticas Desechadas
- **Mocha**:
  - Fue descartado debido a problemas de integración con herramientas modernas como Cypress.
  - La falta de soporte nativo para pruebas end-to-end lo hizo menos eficiente para este proyecto.

## Cómo Ejecutar las Pruebas

### Requisitos Previos
1. Instalar Node.js (versión 14 o superior).
2. Instalar los navegadores necesarios (Chrome, Firefox, etc.).
3. Instalar Postman si se realizarán pruebas de API.

### Instalación de Dependencias
Ejecutar el siguiente comando en la raíz del proyecto:
```bash
npm install
```

### Ejecución de Pruebas con Cypress
1. Abrir la interfaz de Cypress:
   ```bash
   npx cypress open
   ```
2. Seleccionar la prueba deseada y ejecutarla.

### Ejecución de Pruebas con Selenium
1. Ejecutar el script de pruebas:
   ```bash
   node selenium-tests.js
   ```

### Ejecución de Pruebas con Postman
1. Importar la colección de pruebas en Postman.
2. Configurar las variables de entorno necesarias.
3. Ejecutar la colección desde la interfaz o mediante Newman:
   ```bash
   newman run collection.json
   ```

## Paquetes Necesarios
- `cypress`
- `cypress-file-upload`
- `cypress-xpath`
- `selenium-webdriver`
- `chromedriver`
- `geckodriver`
- `newman` 


