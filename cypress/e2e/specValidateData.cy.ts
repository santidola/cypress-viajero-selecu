import { Areas } from "../constants/areas";
import { host } from "../constants/users";

describe('template spec', () => {
  beforeEach(() => {
    cy.visit(`${host}/login`);
    cy.get('#username').type('CR-COORDINADOR'); 
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

    // Obtener la cantidad de botones de colapso
    cy.get('.button-CollapseI').its('length').then((btnsResults) => {
      if (btnsResults > 0) {
        cy.get('.button-CollapseI').first().click({ force: true });

        // Esperar a que las áreas se carguen en lugar de usar `cy.wait(8000)`
        cy.get('path[fill="rgba(255,162,39,1)"]').should('exist').its('length').then((areasLength) => {
          const areas: Areas[] = [];

          cy.get('path[fill="rgba(255,162,39,1)"]').each(($path, index) => {
            cy.wrap($path).invoke('attr', 'val').then((percentaje) => {
              cy.get('tspan').eq(index!).then(($name) => {
                areas.push(new Areas(Number(percentaje), $name.text()));
                cy.log(JSON.stringify(areas)); 
              });
            });
          });
        });
      }
    });
  });
});