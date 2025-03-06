import { host } from "../constants/users";
import { mentors } from "../constants/mentors";

describe('Validación de mentores', () => {
    mentors.forEach((mentor) => {
        it(`Verificar imagen para el mentor ${mentor.fullName}`, () => {
            // Login con las credenciales del mentor
            cy.visit(`${host}/login`);
            cy.get('#username').type(mentor.username);
            cy.get('input[type="password"]').type(mentor.password);
            cy.get('button.btn-login').click();

            // Verificar si la imagen existe
            cy.get('img[alt="Buscando a Xuaii"]').then($el => {
                if ($el.length === 0) {
                    cy.log(`La imagen "Buscando a Xuaii" no se encontró en la página para el mentor ${mentor.fullName}`);

                } else {
                    cy.log(`La imagen "Buscando a Xuaii" se encontró en la página para el mentor ${mentor.fullName}`);
                    cy.get('img[alt="Buscando a Xuaii"]').click();
                    cy.wait(1000);

                    cy.get(".scrollbar-container")
                        .should("be.visible")
                        .trigger("mouseover");

                    // Navegar por las opciones del menú
                    cy.get('.nav-link').eq(0).click();
                    cy.get('.nav-link').eq(2).click({ force: true });

                    cy.get('#filterCampus option').contains(mentor.institution).then($el => {
                        if ($el.length === 0) {
                            cy.log(`La opción "${mentor.institution}" no se encontró en el menú`);
                        } else {
                            cy.log(`La opción "${mentor.institution}" se encontró en el menú`);
                        }
                    });

                    cy.get('#filterGrade option').contains(mentor.group).then($el => {
                        if ($el.length === 0) {
                            cy.log(`La opción "${mentor.group}" no se encontró en el menú`);
                        } else {
                            cy.log(`La opción "${mentor.group}" se encontró en el menú`);
                        }
                    });
                }
            });
        });
    });
});