import { defineConfig } from "cypress";
import { host } from "./cypress/constants/users";

export default defineConfig({
  e2e: {
    baseUrl: host,
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.ts"
  }
});
