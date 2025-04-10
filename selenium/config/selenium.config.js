const { Builder } = require('selenium-webdriver');

const buildDriver = () => {
  return new Builder().forBrowser('chrome').build();
};

module.exports = { buildDriver };