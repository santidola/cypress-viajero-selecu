import { host } from "../constants/users";
import { coordinadores } from "../constants/coordinador";
import { after, describe, it } from "node:test";

describe('Validación de coordinadores', () => {
    const coordinadoresSinlogin: any[] = [];

    coordinadores.forEach((coordinador) => {
        it(`Verificar imagen para el coordinador ${coordinador.fullName}`, () => {
            // Login con las credenciales del coordinador
            cy.visit(`${host}/login`);
            cy.get('#username').type(coordinador.username);
            cy.get('input[type="password"]').type(coordinador.password);
            cy.get('button.btn-login').click();

            // Esperar la respuesta del POST y la redirección
            cy.wait(5000); // Espera 5 segundos para la redirección
            cy.url().then((url) => {
                if (url.includes('/select-product')) {
                    // Login exitoso, verificar la imagen
                    cy.get('body', { timeout: 10000 }).then(($body) => {
                        const imageExists = $body.find('img[alt="Buscando a Xuaii"]').length > 0;
                        if (imageExists) {
                            cy.log(`La imagen "Buscando a Xuaii" se encontró en la página para el coordinador ${coordinador.fullName}`);
                            cy.get('img[alt="Buscando a Xuaii"]').click();
                            cy.wait(1000);
                            cy.get(".scrollbar-container").should("be.visible").trigger("mouseover");
                            cy.get('.nav-link').eq(0).click();
                            cy.get('.pcoded-trigger > .pcoded-submenu > :nth-child(1) > .nav-link').click({ force: true });

                            cy.get('.filter-section-two > :nth-child(1)').contains(coordinador.institution).then($el => {
                                if ($el.length === 0) {
                                    cy.log(`La opción "${coordinador.institution}" no se encontró la institution`);
                                } else {
                                    cy.log(`La opción "${coordinador.institution}" se encontró la institution`);
                                    throw new Error(`Error: La opción "${coordinador.institution}" no se encontró la institution para ${coordinador.fullName}`);
                                }
                            });
                        
                        } else {
                            cy.log(`La imagen "Buscando a Xuaii" no se encontró en la página para el coordinador ${coordinador.fullName}`);
                            coordinadoresSinlogin.push({username: coordinador.username, msg: "no tiene xuaii"}); // Agregar antes de fallar
                            throw new Error(`Error: La imagen "Buscando a Xuaii" no se encontró para ${coordinador.fullName}`);
                        }
                    });
                } else {
                    // Login fallido
                    cy.log(`Login fallido para ${coordinador.fullName}, URL actual: ${url}`);
                    throw new Error(`Error: Login fallido para ${coordinador.fullName}, URL actual: ${url}`);
                }
            });
        });
    });

    after(() => {
        cy.log('Lista de coordinadores sin imagen de Xuaii (fallos):');
        coordinadoresSinlogin.forEach((nombre) => {
            cy.log(`${nombre.username} - ${nombre.msg}`);
        });
    });
});