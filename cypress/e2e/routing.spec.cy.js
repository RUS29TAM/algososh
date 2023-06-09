import {DELAY_IN_MS} from "../../src/constants/delays";
import {inputEnterIndex, inputEnterNumber, inputEnterText, inputEnterValue} from "../support/constants";

describe('Маршрутизация после посещения главной страницы', () => {
    before(() => {
        cy.visit('/')
    })

    it('Переход на страницу "строка"', () => {
        cy.visit('/recursion');
        cy.contains('Строка')
        cy.get('button').contains('К оглавлению')
        cy.get('button').contains('Развернуть')
        cy.get(inputEnterText)
        cy.wait(DELAY_IN_MS)
    })

    it('Переход на страницу "Последовательность Фибоначчи"', () => {
        cy.visit('/fibonacci');
        cy.contains('Последовательность Фибоначчи')
        cy.get('button').contains('К оглавлению')
        cy.get('button').contains('Рассчитать')
        cy.get(inputEnterNumber)
        cy.wait(DELAY_IN_MS)
    })

    it('Переход на страницу "Сортировка массива"', () => {
        cy.visit('/sorting');
        cy.contains('Сортировка массива')
        cy.get('button').contains('К оглавлению')
        cy.get('label').contains('Выбор')
        cy.get('label').contains('Пузырёк')
        cy.get('button').contains('По возрастанию')
        cy.get('button').contains('По убыванию')
        cy.get('button').contains('Новый массив')
        cy.wait(DELAY_IN_MS)
    })

    it('Переход на страницу "Стек"', () => {
        cy.visit('/stack');
        cy.contains('Стек')
        cy.get('button').contains('К оглавлению')
        cy.get('button').contains('Добавить')
        cy.get('button').contains('Удалить')
        cy.get('button').contains('Очистить')
        cy.get(inputEnterText)
        cy.wait(DELAY_IN_MS)
    })

    it('Переход на страницу "Очередь"', () => {
        cy.visit('/queue');
        cy.contains('Очередь')
        cy.get('button').contains('К оглавлению')
        cy.get('button').contains('Добавить')
        cy.get('button').contains('Удалить')
        cy.get('button').contains('Очистить')
        cy.get(inputEnterText)
        cy.wait(DELAY_IN_MS)
    })

    it('Переход на страницу "Связный список"', () => {
        cy.visit('/list');
        cy.contains('Связный список')
        cy.get('button').contains('К оглавлению')
        cy.get('button').contains('Добавить в head')
        cy.get('button').contains('Добавить в tail')
        cy.get('button').contains('Удалить из head')
        cy.get('button').contains('Удалить из tail')
        cy.get('button').contains('Удалить по индексу')
        cy.get('button').contains('Добавить по индексу')
        cy.get(inputEnterIndex)
        cy.get(inputEnterValue)
        cy.wait(DELAY_IN_MS)
    })
})
