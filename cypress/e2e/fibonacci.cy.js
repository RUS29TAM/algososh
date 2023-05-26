import {circle, inputEnterNumber} from "../support/constants";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('Тест для компонента "Фибоначчи"', () => {
    beforeEach(() => {
        cy.visit('/fibonacci');
    })
    describe('Состояние кнопок компонента', () => {
        it('Кнопка не активна при пустом инпуте - тест пройден', () => {
            cy.get(inputEnterNumber).should('have.value', '');
            cy.contains('Рассчитать').as('button');
            cy.get('@button').should('be.disabled');
        })

        it('Кнопка активна в инпут не пустой - тест пройден', () => {
            cy.get(inputEnterNumber).type('9');
            cy.contains('Рассчитать').as('button');
            cy.get('@button').should('not.be.disabled');
        })

        it('Кнопка не активна если инпут не валиден > 19 - тест пройден', () => {
            cy.get(inputEnterNumber).should('have.value', '').type('20');
            cy.contains('Рассчитать').as('button');
            cy.get('@button').should('be.disabled');
        })
    })

    describe('Тестирование алгоритма Фибоначчи', () => {
        it('Последовательность чисел расширяется корректно', () => {
            cy.get(inputEnterNumber).type('5');
            cy.contains('Рассчитать').as('button').click();
            cy.get(circle).should('have.length', 1).each(($item, index) => {
                const expectedValues = ['1'];
                expect($item).to.contain(expectedValues[index]);
            });
            cy.wait(SHORT_DELAY_IN_MS)

            cy.get(circle).should('have.length', 2).each(($item, index) => {
                const expectedValues = ['1', '1'];
                expect($item).to.contain(expectedValues[index]);
            });
            cy.wait(SHORT_DELAY_IN_MS)

            cy.get(circle).should('have.length', 3).each(($item, index) => {
                const expectedValues = ['1', '1', '2'];
                expect($item).to.contain(expectedValues[index]);
            });
            cy.wait(SHORT_DELAY_IN_MS)

            cy.get(circle).should('have.length', 4).each(($item, index) => {
                const expectedValues = ['1', '1', '2', '3'];
                expect($item).to.contain(expectedValues[index]);
            });
            cy.wait(SHORT_DELAY_IN_MS)

            cy.get(circle).should('have.length', 5).each(($item, index) => {
                const expectedValues = ['1', '1', '2', '3', '5'];
                expect($item).to.contain(expectedValues[index]);
            });
        });
    });
});

