import {circle} from "../support/constants";
import {DELAY_IN_MS} from "../../src/constants/delays";

describe('Тест для компонента "Строка"', () => {
    beforeEach(() => {
        cy.visit('/recursion')
    })

    describe('Состояние кнопок компонента', () => {
        it('Кнопка не активна при пустом инпуте - тест пройден', () => {
            cy.get('input[placeholder=\"Введите текст\"]').should('have.value', '');
            cy.contains('Развернуть').as('button');
            cy.get('@button').should('be.disabled')
        })

        it('Кнопка активна если инпут не пустой - тест пройден', () => {
            cy.get('input[placeholder=\"Введите текст\"]').should('have.value', '').type('Палиндром');
            cy.contains('Развернуть').as('button');
            cy.get('@button').should('not.be.disabled')
        })

    })

    describe('Разворот строки', () => {
        it('Строка разворачивается, стили отображаются корректно', () => {
            cy.get('input[placeholder=\"Введите текст\"]').type('123456');
            cy.get('button').contains('Развернуть').click();
            cy.get(circle).should('have.length', 6).each(($item) => {

                cy.wrap($item).then(($element, index) => {
                    if (index === 0) cy.wrap($element).contains(`${index + 1}`)
                });

                const expectedValuesFirst = ['1', '6'];
                cy.get(circle).should('have.length', 6).each(($item, index) => {
                    if (expectedValuesFirst.includes(`${index + 1}`)) {
                        expect($item).to.contain(`${index + 1}`);
                        cy.wrap($item).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
                    }
                });
            });

            cy.wait(DELAY_IN_MS)

            const expectedValuesSecond = [
                {index: 0, value: '6', borderColor: 'rgb(127, 224, 81)'},
                {index: 1, value: '2', borderColor: 'rgb(210, 82, 225)'},
                {index: 4, value: '5', borderColor: 'rgb(210, 82, 225)'},
                {index: 5, value: '1', borderColor: 'rgb(127, 224, 81)'},
            ];
            cy.get(circle).should('have.length', 6).each(($item, index) => {
                const match = expectedValuesSecond.find(obj => obj.index === index);
                if (match) {
                    expect($item).to.contain(match.value);
                    cy.wrap($item).should('have.css', 'border', `4px solid ${match.borderColor}`);
                }
            });

            cy.wait(DELAY_IN_MS)

            const expectedValuesThird = [
                {index: 1, value: '5', borderColor: 'rgb(127, 224, 81)'},
                {index: 2, value: '3', borderColor: 'rgb(210, 82, 225)'},
                {index: 3, value: '4', borderColor: 'rgb(210, 82, 225)'},
                {index: 4, value: '2', borderColor: 'rgb(127, 224, 81)'},
            ];
            cy.get(circle).should('have.length', 6).each(($item, index) => {
                const match = expectedValuesThird.find(obj => obj.index === index);
                if (match) {
                    expect($item).to.contain(match.value);
                    cy.wrap($item).should('have.css', 'border', `4px solid ${match.borderColor}`);
                }
            });

            cy.wait(DELAY_IN_MS)

            const expectedValuesFourth = [
                {index: 2, value: '4', borderColor: 'rgb(127, 224, 81)'},
                {index: 3, value: '3', borderColor: 'rgb(127, 224, 81)'},
            ];

            cy.get(circle).should('have.length', 6).each(($item, index) => {
                const match = expectedValuesFourth.find(obj => obj.index === index);
                if (match) {
                    expect($item).to.contain(match.value);
                    cy.wrap($item).should('have.css', 'border', `4px solid ${match.borderColor}`);
                }
            });

            const numbers = [6, 5, 4, 3, 2, 1];
            cy.get(circle).should('have.length', numbers.length).each(($item, index) => {
                cy.wrap($item).contains(numbers[index]);
            });
        })
    })
})
