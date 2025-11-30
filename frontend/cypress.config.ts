import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false, // Disable the default support file for now
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
