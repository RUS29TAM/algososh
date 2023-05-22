import {fibonacci, list, queue, recursion, sorting, stack} from "../support/constants";

describe('Запуск приложения', () => {
    it('Отрисовка главной страницы - тест пройден', () => {
        cy.visit('/')
        cy.contains('МБОУ АЛГОСОШ')
        cy.get(recursion)
        cy.get(fibonacci)
        cy.get(sorting)
        cy.get(stack)
        cy.get(queue)
        cy.get(list)
        cy.contains('Вдохновлено школами, в которых не учили алгоритмам')
        cy.contains('© RUS29TAM Сделано в Практикуме.')
    })
})