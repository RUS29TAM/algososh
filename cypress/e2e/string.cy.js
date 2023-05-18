import {circle} from "../support/constants";

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

        it('Кнопка активна в инпут не пустой - тест пройден', () => {
            cy.get('input[placeholder=\"Введите текст\"]').should('have.value', '').type('Палиндром');
            cy.contains('Развернуть').as('button');
            cy.get('@button').should('not.be.disabled')
        })

    })
    describe('Разворот строки', () => {
        it('Строка разворачивается корректно', () => {
            cy.get('input[placeholder=\"Введите текст\"]').type('тет-а-тет');
            cy.get('button').contains('Развернуть').click();
            cy.get(circle).should('have.length', 9).each(($item, index) => {
                if (index === 0) cy.wrap().contains('т')
                if (index === 1) cy.wrap().contains('е')
                if (index === 2) cy.wrap().contains('т')
                if (index === 3) cy.wrap().contains('-')
                if (index === 4) cy.wrap().contains('а')
                if (index === 5) cy.wrap().contains('-')
                if (index === 6) cy.wrap().contains('т')
                if (index === 7) cy.wrap().contains('е')
                if (index === 8) cy.wrap().contains('т')
            })
        })
    })
})
