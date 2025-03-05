import { Areas } from "../constants/areas";
import { host } from "../constants/users";
import { CollectPercetajes } from "../tests/collectPercentajes.cy";

describe('template spec', () => {
  beforeEach(() => {
    cy.visit(`${host}/login`);
    cy.get('#username').type('RI-COORDINADOR');
    cy.get('input[type="password"]').type('1234');
    cy.get('button.btn-login').click();
  });

  it('start session with successfully', () => {
    // Seleccionar el botón con la imagen específica y hacer clic
    cy.get('img[alt="Buscando a Xuaii"]')
      .closest('button')
      .click()
      .then(($el) => {
        cy.log($el.parent().html()); // Muestra el HTML en el panel de Cypress
      });

    // Desplegar el menú lateral si no está visible
    cy.get(".scrollbar-container")
      .should("be.visible")
      .trigger("mouseover");

    // Navegar por las opciones del menú
    cy.get('.nav-link').eq(0).click();
    cy.get('.nav-link').eq(3).click({ force: true });

    cy.wait(8000);

    // Obtener la cantidad de botones de colapso  
    cy.get('.button-CollapseI').its('length').then(($btns) => {
      if ($btns > 0) {
        for (let i = 0; i < $btns; i++) {
          cy.get('.button-CollapseI').eq(i).click({ force: true });
          const collectPercetajes = new CollectPercetajes();
          cy.then(() => collectPercetajes.collect()
          ).then(() => collectPercetajes.collectCorrectAswers()).then(() => {
            cy.log(JSON.stringify(collectPercetajes.areas));
          });
        }


      }
    });
  });
});