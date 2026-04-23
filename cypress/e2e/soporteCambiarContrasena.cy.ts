/// <reference types="cypress" />

import { viajeros, generarContrasena } from "../constants/viajeros";

/**
 * Automatización de cambio de contraseña en soporte.selecu.net
 *
 * Flujo por cada estudiante:
 *  1. Login con credenciales de administrador (input#document, input#password)
 *  2. Clic en la tarjeta "Viajeros"
 *  3. Seleccionar "Cambiar contraseña" en select#action_type
 *  4. Ingresar documento del estudiante en input#document
 *  5. Clic en botón "Enviar"
 *  6. Completar "Contraseña nueva" y "Confirmar contraseña"
 *  7. Clic en botón "Actualizar"
 *
 * Contraseña generada: primerNombre + primeros2dígitosDelDocumento
 * Ejemplo: firstName="Carlos", document="1035438452" → "Carlos10"
 *
 * Nota: el popup de "guardar contraseña" del navegador está deshabilitado
 * en cypress.config.ts mediante --disable-save-password-bubble
 */

const SOPORTE_URL = "https://soporte.selecu.net";
const ADMIN_USER  = "1035438452";
const ADMIN_PASS  = "Selecu123";

describe("Soporte Selecu - Cambiar contraseña de viajeros", () => {

    viajeros.forEach((viajero) => {
        const nuevaContrasena = generarContrasena(viajero);

        it(`Cambiar contraseña de ${viajero.fullName} (doc: ${viajero.document}) → ${nuevaContrasena}`, () => {

            // ── 1. LOGIN ──────────────────────────────────────────────────
            cy.visit(`${SOPORTE_URL}/#/login`);
            cy.get("input#document").clear().type(ADMIN_USER);
            cy.get("input#password").clear().type(ADMIN_PASS);
            cy.get("button").contains("Iniciar sesión").click();

            // ── 2. SELECCIONAR PRODUCTO VIAJEROS ──────────────────────────
            cy.url().should("not.include", "login", { timeout: 10000 });
            cy.contains("Viajeros", { timeout: 15000 }).click();
            cy.url().should("include", "Viajeros", { timeout: 10000 });

            // ── 3. SELECCIONAR ACCIÓN "CAMBIAR CONTRASEÑA" ────────────────
            cy.get("select#action_type")
                .should("be.visible")
                .select("Cambiar contraseña");

            // ── 4. INGRESAR DOCUMENTO DEL ESTUDIANTE ──────────────────────
            cy.get("input#document").clear().type(viajero.document);

            // ── 5. ENVIAR BÚSQUEDA ────────────────────────────────────────
            cy.get("button").contains("Enviar").click();

            // ── 6. ESPERAR QUE APAREZCA EL FORMULARIO ─────────────────────
            cy.contains("Contraseña nueva").should("be.visible", { timeout: 10000 });

            // ── 7. LLENAR NUEVA CONTRASEÑA ────────────────────────────────
            // Confirmado con inspección real del DOM: .parent().find("input")
            cy.get("label").contains("Contraseña nueva")
                .parent()
                .find("input")
                .clear()
                .type(nuevaContrasena);

            cy.get("label").contains("Confirmar contraseña")
                .parent()
                .find("input")
                .clear()
                .type(nuevaContrasena);

            // ── 8. ACTUALIZAR ─────────────────────────────────────────────
            cy.get("button").contains("Actualizar").click();

            // ── 9. LOG DE RESULTADO ───────────────────────────────────────
            cy.log(`✅ ${viajero.fullName} → contraseña actualizada a: ${nuevaContrasena}`);
            cy.wait(1500);
        });
    });
});
