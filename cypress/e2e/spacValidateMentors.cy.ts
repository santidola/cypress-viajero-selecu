import { host } from "../constants/users";

describe('template spec', () => {
    beforeEach(() => {
      cy.visit(`${host}/login`);
      cy.get('#username').type('RI-COORDINADOR');
      cy.get('input[type="password"]').type('1234');
      cy.get('button.btn-login').click();
    });

    it('start session with successfully', () => {
        // Seleccionar el botón con la imagen específica y hacer clic
        cy.get('img[alt="Buscando a Xuaii"]').first();
    });
});