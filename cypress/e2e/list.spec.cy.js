import {circle, circleContent} from "../support/constants";

describe('Тест для компонента "Очередь"', () => {
    beforeEach(() => {
        cy.visit('/list')
    });

    describe('Состояние кнопок компонента "Связанный список"', () => {
        it('Поле для ввода значения пустое, все кнопки не активны кроме "Удалить из head" "Удалить из tail"', () => {
            cy.get('input[placeholder=\"Введите  значение\"]').should('have.value', '');
            cy.contains('Удалить из head').should('not.be.disabled')
            cy.contains('Удалить из tail').should('not.be.disabled')
            cy.contains('Добавить в head').should('be.disabled')
            cy.contains('Добавить в tail').should('be.disabled')
            cy.contains('Добавить в tail').should('be.disabled')
            cy.contains('Добавить по индексу').should('be.disabled')
            cy.contains('Удалить по индексу').should('be.disabled')
        })

        it('Поле для ввода значения не пустое, все кнопки не активны кроме "Удалить из head" "Удалить из tail"', () => {
            cy.get('input[placeholder=\"Введите  значение\"]').type('PAIN');
            cy.contains('Удалить из head').should('not.be.disabled')
            cy.contains('Удалить из tail').should('not.be.disabled')
            cy.contains('Добавить в head').should('not.be.disabled')
            cy.contains('Добавить в tail').should('not.be.disabled')
            cy.contains('Добавить в tail').should('not.be.disabled')
            cy.contains('Добавить по индексу').should('be.disabled')
            cy.contains('Удалить по индексу').should('be.disabled')
        })

        it('Когда оба инпута заполнены данными - все кнопки активны', () => {
            cy.get('input[placeholder=\"Введите  значение\"]').type('PAIN');
            cy.get('input[placeholder=\"Введите  индекс\"]').type('5');
            cy.contains('Удалить из head').should('not.be.disabled')
            cy.contains('Удалить из tail').should('not.be.disabled')
            cy.contains('Добавить в head').should('not.be.disabled')
            cy.contains('Добавить в tail').should('not.be.disabled')
            cy.contains('Добавить в tail').should('not.be.disabled')
            cy.contains('Добавить по индексу').should('not.be.disabled')
            cy.contains('Удалить по индексу').should('not.be.disabled')
        })
    })

    describe('Тестирование алгоритма "Связанный список"', () => {
        it('Элементы связанного списка по умолчанию отрисованы корректно', () => {
            cy.get(circleContent)
                .should('have.length', 6)
                .each(($item, index) => {
                    const circleCircle = cy.wrap($item).find(circle);
                    circleCircle.should('have.css', 'border', '4px solid rgb(0, 50, 255)');
                    if (index === 0) expect($item).to.contain('head');
                    if (index === 5) expect($item).to.contain('tail');
                });
        });
    });
});
