import { Areas } from "../constants/areas";

export class CollectPercetajes {
    areas: Areas[] = [];

    constructor(areas: Areas[] = []) {
        this.areas = areas;
    }

    collect() {
        cy.wait(4000);
        // Esperar a que las áreas se carguen en lugar de usar `cy.wait(8000)`
        cy.get('.apexcharts-series').children('path').its('length').then((areasLength) => {
    if (areasLength === 0) {
        cy.log('No se encontraron áreas, continuando...');
        return;
    }

    cy.get('.apexcharts-series').children('path', { timeout: 0, log: false }).each(($path, index) => {
        cy.get('.apexcharts-series').find('path').invoke('attr', 'val').then((percentaje) => {
            cy.get('tspan').eq(index!).then(($name) => {
                this.areas.push(new Areas(Number(percentaje), $name.text()));
                cy.log(JSON.stringify(this.areas));
            });
        });
    });
});
    }

    collectCorrectAswers() {
        cy.wait(8000);
        cy.get('button.board-xuaii__section-one__button').each(async ($btn) => {
            cy.wrap($btn).click({ force: true }).then(() => {
                const buttonText = $btn.text().trim(); // Eliminar espacios extra
                cy.log(`Texto del botón: ${buttonText}`);
                
                this.areas.forEach(async(area ,index) => {
                   if (buttonText === "Matemáticas") {
                    cy.get('.card-header')
                    .eq(index+1)
                    .siblings('.questions-table-contaniner-2')
                    .find('.Correct-Color')
                        .should('exist')
                        .its('length')
                        .then(($length) => {
                            cy.log(`Cantidad de .Correct-Color: ${$length}`);
                            area.asignAswers($length);
                        });
                    } 
                })
            });

            // this.areas.forEach(async(area) => {
            //     cy.log(JSON.stringify($btn.text()));
            //     if (area.name === $btn.text()) {
            //         area.asignAswers(await cy.get('.Correct-Color').its('length').then(($length) => $length));
            //     }
            // });
        });
    }
}