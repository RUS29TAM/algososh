import {circle, circleContent, circleSmall, inputEnterIndex, inputEnterValue} from "../support/constants";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('Тест для компонента "Очередь"', () => {
    beforeEach(() => {
        cy.visit('/list')
    });

    // describe('Состояние кнопок компонента "Связанный список"', () => {
    //     it('Поле для ввода значения пустое, все кнопки не активны кроме "Удалить из head" "Удалить из tail"', () => {
    //         cy.get(inputEnterValue).should('have.value', '');
    //         cy.contains('Удалить из head').should('not.be.disabled')
    //         cy.contains('Удалить из tail').should('not.be.disabled')
    //         cy.contains('Добавить в head').should('be.disabled')
    //         cy.contains('Добавить в tail').should('be.disabled')
    //         cy.contains('Добавить в tail').should('be.disabled')
    //         cy.contains('Добавить по индексу').should('be.disabled')
    //         cy.contains('Удалить по индексу').should('be.disabled')
    //     })
    //
    //     it('Поле для ввода значения не пустое, все кнопки не активны кроме "Удалить из head" "Удалить из tail"', () => {
    //         cy.get(inputEnterValue).type('PAIN');
    //         cy.contains('Удалить из head').should('not.be.disabled')
    //         cy.contains('Удалить из tail').should('not.be.disabled')
    //         cy.contains('Добавить в head').should('not.be.disabled')
    //         cy.contains('Добавить в tail').should('not.be.disabled')
    //         cy.contains('Добавить в tail').should('not.be.disabled')
    //         cy.contains('Добавить по индексу').should('be.disabled')
    //         cy.contains('Удалить по индексу').should('be.disabled')
    //     })
    //
    //     it('Когда оба инпута заполнены данными - все кнопки активны', () => {
    //         cy.get(inputEnterValue).type('PAIN');
    //         cy.get(inputEnterIndex).type('5');
    //         cy.contains('Удалить из head').should('not.be.disabled')
    //         cy.contains('Удалить из tail').should('not.be.disabled')
    //         cy.contains('Добавить в head').should('not.be.disabled')
    //         cy.contains('Добавить в tail').should('not.be.disabled')
    //         cy.contains('Добавить в tail').should('not.be.disabled')
    //         cy.contains('Добавить по индексу').should('not.be.disabled')
    //         cy.contains('Удалить по индексу').should('not.be.disabled')
    //     })
    // })

    describe('Тестирование алгоритма "Связанный список"', () => {
        // it('Элементы связанного списка по умолчанию отрисованы корректно', () => {
        //     cy.get(circleContent)
        //         .should('have.length', 6)
        //         .each(($item, index) => {
        //             const circleCircle = cy.wrap($item).find(circle);
        //             circleCircle.should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        //             if (index === 0) expect($item).to.contain('head');
        //             if (index === 5) expect($item).to.contain('tail');
        //         });
        // });
        //
        // it('Добавить ноду в начало связанного списка, рендер и визуализация корректно отработаны', () => {
        //     const inputValue = 'PAIN';
        //     cy.get(inputEnterValue).type(inputValue);
        //     cy.contains('Добавить в head').click();
        //
        //     cy.get(circleSmall)
        //         .eq(0)
        //         .should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        //         .should('contain', inputValue);
        //     cy.wait(SHORT_DELAY_IN_MS)
        //     cy.get(circleContent).first().should('contain', inputValue);
        //     cy.get(circle)
        //         .eq(0)
        //         .should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        //         .should('contain', inputValue);
        //     cy.wait(SHORT_DELAY_IN_MS)
        //     cy.get(circle)
        //         .eq(0)
        //         .should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        //         .should('contain', inputValue);
        // });
//отмена
        //отмена

        it('Добавить ноду в конец связанного списка, рендер и визуализация корректно отработаны', () => {
            const inputValue = 'PAIN';
            cy.get(inputEnterValue).type(inputValue);
            cy.contains('Добавить в tail').click();
            const tailText = 'tail';
            const headText = 'head'

            for (let i = 0; i <= 6; i++) {
                cy.get(circleContent).each(($item, index) => {
                    if (index < i) {
                        cy.wrap($item).find(circle)
                            .should('have.css', 'border', '4px solid rgb(210, 82, 225)');
                    } else if (index === i) {
                        cy.wrap($item).siblings().find(circleSmall)
                            .should('have.css', 'border', '4px solid rgb(210, 82, 225)')
                            .should('have.text', inputValue);
                    }
                });
                cy.wait(SHORT_DELAY_IN_MS);
            }

            cy.get(circleContent).last().find(circle)
                .should('have.css', 'border', '4px solid rgb(127, 224, 81)')
                .should('have.text', inputValue)
            cy.wait(SHORT_DELAY_IN_MS);

            cy.get(circleContent).each(($item) => {
                cy.wrap($item).find(circle)
                    .should('have.css', 'border', '4px solid rgb(0, 50, 255)')
                cy.get(circleContent).last().should('contain.text', tailText)
                cy.get(circleContent).first().should('contain.text', headText)
            });
        });

        it('Добавить ноду в список по индексу, рендер и визуализация корректно отработаны', () => {})
    });
});
