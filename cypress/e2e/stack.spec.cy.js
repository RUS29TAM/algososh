import {circle, circleContent, inputEnterText, stackList} from "../support/constants";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('Тест для компонента "Стек"', () => {
    beforeEach(() => {
        cy.visit('/stack')
    });

    describe('Состояние кнопок компонента', () => {
        it('Кнопка не активна при пустом инпуте - тест пройден', () => {
            cy.get(inputEnterText).should('have.value', '');
            cy.contains('Добавить').should('be.disabled')
            cy.contains('Удалить').should('be.disabled')
            cy.contains('Очистить').should('be.disabled')
        })

        it('Кнопка "Добавить" активна. "Удалить" и "Очистить" не активны если инпут не пустой - тест пройден', () => {
            cy.get(inputEnterText).type('Пять');
            cy.contains('Добавить').should('not.be.disabled')
            cy.contains('Удалить').should('be.disabled')
            cy.contains('Очистить').should('be.disabled')
        })

        it('Кнопка "Удалить" активна. "Добавить" и "Очистить" не активны после добавления значений в стек - тест пройден', () => {
            cy.get(inputEnterText).type('Пять');
            cy.contains('Добавить').click()
            cy.contains('Добавить').should('be.disabled')
            cy.contains('Удалить').should('not.be.disabled')
            cy.contains('Очистить').should('not.be.disabled')
        })

        it('Все Кнопки не активны после очистки стека', () => {
            cy.get(inputEnterText).type('Пять');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('Семь');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('Ноль');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('Один');
            cy.contains('Добавить').click()
            cy.contains('Очистить').click()
            cy.contains('Добавить').should('be.disabled')
            cy.contains('Удалить').should('be.disabled')
            cy.contains('Очистить').should('be.disabled')
        })
    })

    describe('Тестирование алгоритма Стека', () => {
        it('Добавить элемент', () => {
            cy.get(inputEnterText).type('Пять');
            cy.contains('Добавить').click();

            cy.get(circleContent)
                .should('have.length.at.least', 1)
                .should(($items) => {
                    const item = $items.first();
                    expect(item.text()).to.contain('top');
                    expect(item.text()).to.contain('Пять');
                    expect(item.text()).to.contain('0');
                });

            cy.get(circle).should('have.length', 1).each(($item) => {
                cy.wrap($item).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
            })

            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(circle).should('have.length', 1).each(($item) => {
                cy.wrap($item).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
            })

            cy.get(inputEnterText).type('Ноль');
            cy.contains('Добавить').click();
            cy.get(circleContent)
                .should('have.length', 2)
                .then(($items) => {
                    const item1 = $items.eq(0);
                    const item2 = $items.eq(1);
                    expect(item1).to.contain('Пять');
                    expect(item1).to.contain('0');
                    expect(item2).to.contain('Ноль');
                    expect(item2).to.contain('1');
                    expect(item2).to.contain('top');
                });

            cy.get(circle)
                .should('have.length', 2)
                .eq(1)
                .should('have.css', 'border', '4px solid rgb(210, 82, 225)')

            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(circle)
                .should('have.length', 2)
                .eq(1)
                .should('have.css', 'border', '4px solid rgb(0, 50, 255)')

            cy.get(inputEnterText).type('Семь')
            cy.contains('Добавить').click();

            cy.get(circleContent).should('have.length', 3)
            cy.get(circleContent)
                .eq(0)
                .should('contain', 'Пять')
                .should('contain', '0')

            cy.get(circleContent)
                .eq(1)
                .should('contain', 'Ноль')
                .should('contain', '1')

            cy.get(circleContent)
                .eq(2)
                .should('contain', 'Семь')
                .should('contain', 'top')

            cy.get(circle)
                .should('have.length', 3)

            cy.get(circle)
                .eq(2)
                .should('have.css', 'border', '4px solid rgb(210, 82, 225)')

            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(circle)
                .should('have.length', 3)
                .eq(2)
                .should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        })

        it('Удалить эелемент', () => {
            cy.get(inputEnterText).type('Ноль');
            cy.contains('Добавить').click();
            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(inputEnterText).type('Семь');
            cy.contains('Добавить').click();
            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(inputEnterText).type('Пять');
            cy.contains('Добавить').click();
            cy.wait(SHORT_DELAY_IN_MS)

            cy.contains('Удалить').click();
            cy.get(circle)
                .should('have.length', 2)
                .eq(1)
                .should('have.css', 'border', '4px solid rgb(210, 82, 225)')

            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(circleContent)
                .should('have.length.at.least', 2)
                .eq(1)
                .should('contain', 'Семь')
                .should('contain', '1')
                .should('contain', 'top');

            cy.contains('Удалить').click();
            cy.get(circle)
                .should('have.length', 1)
                .eq(0)
                .should('have.css', 'border', '4px solid rgb(210, 82, 225)')

            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(circleContent)
                .should('have.length.at.least', 1)
                .first()
                .should('contain', 'Ноль')
                .should('contain', '0')
                .should('contain', 'top');

            cy.contains('Удалить').click();
            cy.get(circle).should('have.length', 0)
        })

        it('Очистка стека', () => {
            cy.get(inputEnterText).type('Пять');
            cy.contains('Добавить').click();
            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(inputEnterText).type('Ноль');
            cy.contains('Добавить').click();
            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(inputEnterText).type('Один');
            cy.contains('Добавить').click();
            cy.wait(SHORT_DELAY_IN_MS)
            cy.contains('Очистить').click();
            cy.get(stackList).should('have.length', 0)
        })
    })
})
