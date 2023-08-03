const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
        return config;
    },
    specPattern: "cypress/e2e/**/*.ts",
    baseUrl: 'https://automationteststore.com',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    retries: 0,
    env:{
      "allureResultsPath": "allure-results"
    }
    
  },
})
