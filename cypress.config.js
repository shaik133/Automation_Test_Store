const { defineConfig } = require("cypress");
supportFile: "cypress/support/e2e.js"
module.exports = defineConfig({
  env:{
    base_url:"https://automationteststore.com"
   },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },

});
