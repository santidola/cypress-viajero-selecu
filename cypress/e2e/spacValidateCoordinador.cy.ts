import { host } from "../constants/users";
import { coordinadores } from "../constants/coordinador";
import { describe, it } from "node:test";

describe('Validación de mentores', () => {

    const coordinadoresSinlogin: string[] = [];

    coordinadores.forEach((coordinador) => {
        it(`Verificar imagen para el mentor ${coordinador.fullName}`, () => {
            // Login con las credenciales del mentor
            cy.visit(`${host}/login`);
            cy.get('#username').type(coordinador.username);
            cy.get('input[type="password"]').type(coordinador.password);
            cy.get('button.btn-login').click();

            

            // Verificar si la imagen existe
            cy.get('img[alt="Buscando a Xuaii"]').then($el => {
                if ($el.length === 0) {
                    cy.log(`La imagen "Buscando a Xuaii" no se encontró en la página para el mentor ${coordinador.fullName}`);

                } else {
                    cy.log(`La imagen "Buscando a Xuaii" se encontró en la página para el mentor ${coordinador.fullName}`);
                    cy.get('img[alt="Buscando a Xuaii"]').click();
                }
            });
        });
    });
});
