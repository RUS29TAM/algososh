import {circle} from "../support/constants";

describe('Тест для компонента "Фибоначчи"', () => {
    beforeEach(() => {
        cy.visit('/fibonacci')
    })
    describe('Состояние кнопок компонента', () => {
        it('Кнопка не активна при пустом инпуте - тест пройден', () => {
            cy.get('input[placeholder=\"Введите число\"]').should('have.value', '');
            cy.contains('Рассчитать').as('button');
            cy.get('@button').should('be.disabled')
        })

        it('Кнопка активна в инпут не пустой - тест пройден', () => {
            cy.get('input[placeholder=\"Введите число\"]').type('9');
            cy.contains('Рассчитать').as('button');
            cy.get('@button').should('not.be.disabled')
        })

        it('Кнопка не активна если инпут не валиден > 19 - тест пройден', () => {
            cy.get('input[placeholder=\"Введите число\"]').should('have.value', '').type('20');
            cy.contains('Рассчитать').as('button');
            cy.get('@button').should('be.disabled')
        })
    })

    describe('Тестирование алгоритма Фибоначчи', () => {
        it('Строка расширяется корректно', () => {
            cy.get('input[placeholder=\"Введите число\"]').type('5');
            cy.contains('Рассчитать').as('button').click();
            cy.get(circle).should('have.length', 1).each(($item, index) => {})
        });
    })
})

