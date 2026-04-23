import { defineConfig } from "cypress";
import { host } from "./cypress/constants/users";

export default defineConfig({
  e2e: {
    baseUrl: host,
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.ts",
  },

  // Deshabilitar el popup de "guardar contraseña" del navegador Chrome
  // cuando se ejecutan tests que manejan formularios de contraseña
  setupNodeEvents(on, config) {
    on("before:browser:launch", (browser, launchOptions) => {
      if (browser.family === "chromium") {
        // Deshabilita la burbuja/popup de guardar contraseña
        launchOptions.args.push("--disable-save-password-bubble");
        // Deshabilita el gestor de contraseñas integrado
        launchOptions.preferences.default["credentials_enable_service"] = false;
        launchOptions.preferences.default["profile.password_manager_enabled"] = false;
      }
      return launchOptions;
    });
  },
});
