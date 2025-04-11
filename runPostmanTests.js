const newman = require('newman'); // Importar el módulo de Newman
const fs = require('fs');
const path = require('path');

// Ruta del archivo de la colección de Postman
const collectionPath = './Postman/Reqres_API_Test_Collection.postman_collection.json';

// Ruta para guardar el reporte
const reportPath = './postman/report.json';

// Verificar si la carpeta "postman" existe, si no, crearla
const postmanDir = path.dirname(reportPath);
if (!fs.existsSync(postmanDir)) {
  fs.mkdirSync(postmanDir, { recursive: true });
  console.log(`📁 Carpeta creada: ${postmanDir}`);
}

// Ejecutar los tests de Postman usando Newman
newman.run({
  collection: require(collectionPath), // Cargar la colección
  reporters: ['cli', 'json'], // Reportar en CLI y formato JSON
  reporter: {
    json: {
      export: reportPath, // Guardar el reporte en formato JSON
    },
  },
}, (err, summary) => {
  if (err) {
    console.error('Error al ejecutar la colección:', err);
  } else {
    console.log('Pruebas completas. Revisa el reporte en "postman/report.json".');
  }
});
