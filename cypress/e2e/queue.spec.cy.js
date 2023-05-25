import {circle, circleContent, inputEnterText, stackList} from "../support/constants";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('Тест для компонента "Очередь"', () => {
    beforeEach(() => {
        cy.visit('/queue')
    });

    describe('Состояние кнопок компонента "Очередь"', () => {
        it('Кнопка не активна при пустом инпуте', () => {
            cy.get(inputEnterText).should('have.value', '');
            cy.contains('Добавить').should('be.disabled')
            cy.contains('Удалить').should('be.disabled')
            cy.contains('Очистить').should('be.disabled')
        })

        it('Кнопка "Добавить" активна. "Удалить" и "Очистить" не активны если инпут не пустой', () => {
            cy.get(inputEnterText).type('Пять');
            cy.contains('Добавить').should('not.be.disabled')
            cy.contains('Удалить').should('be.disabled')
            cy.contains('Очистить').should('be.disabled')
        })

        it('Кнопка "Удалить" активна. "Добавить" и "Очистить" не активны после добавления значений в очередь', () => {
            cy.get(inputEnterText).type('Пять');
            cy.contains('Добавить').click()
            cy.contains('Добавить').should('be.disabled')
            cy.contains('Удалить').should('not.be.disabled')
            cy.contains('Очистить').should('not.be.disabled')
        })

        it('Все Кнопки не активны после очистки очереди', () => {
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

    describe('Тестирование алгоритма очереди', () => {
        it('Добавить элемент работает, элементы визуализированы корректно', () => {
            cy.get(inputEnterText).type('O_o');
            cy.contains('Добавить').click();

            cy.get(circleContent)
                .should('have.length.at.least', 1)
                .should(($items) => {
                    const item = $items.first();
                    expect(item.text()).to.contain('head');
                    expect(item.text()).to.contain('O_o');
                    expect(item.text()).to.contain('tail');
                    expect(item.text()).to.contain('0');
                });
            cy.get(circle)
                .should('have.length', 7)
                .eq(0)
                .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(circle)
                .should('have.length', 7)
                .eq(0)
                .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

            cy.get('input[placeholder=\"Введите текст\"]').type('Ноль');
            cy.contains('Добавить').click();
            cy.get(circleContent)
                .first()
                .should('contain', 'O_o')
                .should('contain', '0')
                .should('contain', 'head');

            cy.get(circleContent)
                .eq(1)
                .should('contain', 'Ноль')
                .should('contain', '1')
                .should('contain', 'tail');

            cy.get(circle)
                .should('have.length', 7)
                .eq(1)
                .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(circle)
                .should('have.length', 7)
                .eq(0)
                .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
            cy.get(circle)
                .should('have.length', 7)
                .eq(1)
                .should('have.css', 'border', '4px solid rgb(0, 50, 255)');

            cy.get(inputEnterText).type('5555');
            cy.contains('Добавить').click();
            cy.get(circleContent)
                .first()
                .should('contain', 'O_o')
                .should('contain', '0')
                .should('contain', 'head');

            cy.get(circleContent)
                .eq(1)
                .should('contain', 'Ноль')
                .should('contain', '1')

            cy.get(circleContent)
                .eq(2)
                .should('contain', '5555')
                .should('contain', '2')
                .should('contain', 'tail');

            cy.get(circle)
                .should('have.length', 7)
                .eq(2)
                .should('have.css', 'border', '4px solid rgb(210, 82, 225)');

            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(circle)
                .should('have.length', 7)
                .eq(0)
                .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
            cy.get(circle)
                .should('have.length', 7)
                .eq(1)
                .should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        })

        it('Удалить элемент работает, элементы визуализированы корректно', () => {
            cy.get(inputEnterText).type('one');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('two');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('три');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('four');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('five');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('six');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('S7');
            cy.contains('Добавить').click()

            cy.get(circleContent)
                .eq(0)
                .should('contain', 'one')
                .should('contain', '0')
                .should('contain', 'head');

            cy.get(circleContent)
                .eq(1)
                .should('contain', 'two')
                .should('contain', '1');

            cy.get(circleContent)
                .eq(2)
                .should('contain', 'три')
                .should('contain', '2');

            cy.get(circleContent)
                .eq(3)
                .should('contain', 'four')
                .should('contain', '3');

            cy.get(circleContent)
                .eq(4)
                .should('contain', 'five')
                .should('contain', '4');

            cy.get(circleContent)
                .eq(5)
                .should('contain', 'six')
                .should('contain', '5');

            cy.get(circleContent)
                .eq(6)
                .should('contain', 'S7')
                .should('contain', '6')
                .should('contain', 'tail');

            cy.contains('Удалить').click(); //первый элемент
            cy.get(circle)
                .should("have.length", 7)
                .eq(0)
                .should("have.css", "border", "4px solid rgb(210, 82, 225)");

            cy.wait(SHORT_DELAY_IN_MS)

            cy.get(circleContent)
                .eq(0)
                .should('contain', '0')
                .should('not.contain', 'head')
                .should('contain', '')

            cy.get(circleContent)
                .eq(1)
                .should('contain', 'two')
                .should('contain', '1')
                .should('contain', 'head');

            cy.get(circleContent)
                .eq(2)
                .should('contain', 'три')
                .should('contain', '2');

            cy.get(circleContent)
                .eq(3)
                .should('contain', 'four')
                .should('contain', '3');

            cy.get(circleContent)
                .eq(4)
                .should('contain', 'five')
                .should('contain', '4');

            cy.get(circleContent)
                .eq(5)
                .should('contain', 'six')
                .should('contain', '5');

            cy.get(circleContent)
                .eq(6)
                .should('contain', 'S7')
                .should('contain', '6')
                .should('contain', 'tail');

            cy.contains('Удалить').click();//второй
            cy.get(circle)
                .should("have.length", 7)
                .eq(1)
                .should("have.css", "border", "4px solid rgb(210, 82, 225)");

            cy.wait(SHORT_DELAY_IN_MS)

            cy.get(circleContent)
                .eq(0)
                .should('contain', '')
                .should('contain', '0')
                .should('not.contain', 'head')

            cy.get(circleContent)
                .eq(1)
                .should('contain', '')
                .should('contain', '1')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(2)
                .should('contain', 'три')
                .should('contain', '2')
                .should('contain', 'head');

            cy.get(circleContent)
                .eq(3)
                .should('contain', 'four')
                .should('contain', '3');

            cy.get(circleContent)
                .eq(4)
                .should('contain', 'five')
                .should('contain', '4');

            cy.get(circleContent)
                .eq(5)
                .should('contain', 'six')
                .should('contain', '5');

            cy.get(circleContent)
                .eq(6)
                .should('contain', 'S7')
                .should('contain', '6')
                .should('contain', 'tail');

            cy.contains('Удалить').click(); //третий
            cy.get(circle)
                .should("have.length", 7)
                .eq(2)
                .should("have.css", "border", "4px solid rgb(210, 82, 225)");

            cy.wait(SHORT_DELAY_IN_MS)

            cy.get(circleContent)
                .eq(0)
                .should('contain', '')
                .should('contain', '0')
                .should('not.contain', 'head')

            cy.get(circleContent)
                .eq(1)
                .should('contain', '')
                .should('contain', '1')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(2)
                .should('contain', '')
                .should('contain', '2')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(3)
                .should('contain', 'four')
                .should('contain', '3')
                .should('contain', 'head');

            cy.get(circleContent)
                .eq(4)
                .should('contain', 'five')
                .should('contain', '4');

            cy.get(circleContent)
                .eq(5)
                .should('contain', 'six')
                .should('contain', '5');

            cy.get(circleContent)
                .eq(6)
                .should('contain', 'S7')
                .should('contain', '6')
                .should('contain', 'tail');

            cy.contains('Удалить').click(); //четвертый
            cy.get(circle)
                .should("have.length", 7)
                .eq(3)
                .should("have.css", "border", "4px solid rgb(210, 82, 225)");

            cy.wait(SHORT_DELAY_IN_MS)

            cy.get(circleContent)
                .eq(0)
                .should('contain', '')
                .should('contain', '0')
                .should('not.contain', 'head')

            cy.get(circleContent)
                .eq(1)
                .should('contain', '')
                .should('contain', '1')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(2)
                .should('contain', '')
                .should('contain', '2')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(3)
                .should('contain', '')
                .should('contain', '3')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(4)
                .should('contain', 'five')
                .should('contain', '4')
                .should('contain', 'head');

            cy.get(circleContent)
                .eq(5)
                .should('contain', 'six')
                .should('contain', '5');

            cy.get(circleContent)
                .eq(6)
                .should('contain', 'S7')
                .should('contain', '6')
                .should('contain', 'tail');

            cy.contains('Удалить').click(); //пятый
            cy.get(circle)
                .should("have.length", 7)
                .eq(4)
                .should("have.css", "border", "4px solid rgb(210, 82, 225)");

            cy.wait(SHORT_DELAY_IN_MS)

            cy.get(circleContent)
                .eq(0)
                .should('contain', '')
                .should('contain', '0')
                .should('not.contain', 'head')

            cy.get(circleContent)
                .eq(1)
                .should('contain', '')
                .should('contain', '1')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(2)
                .should('contain', '')
                .should('contain', '2')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(3)
                .should('contain', '')
                .should('contain', '3')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(4)
                .should('contain', '')
                .should('contain', '4')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(5)
                .should('contain', 'six')
                .should('contain', '5')
                .should('contain', 'head');

            cy.get(circleContent)
                .eq(6)
                .should('contain', 'S7')
                .should('contain', '6')
                .should('contain', 'tail');

            cy.contains('Удалить').click(); //шестой
            cy.get(circle)
                .should("have.length", 7)
                .eq(5)
                .should("have.css", "border", "4px solid rgb(210, 82, 225)");

            cy.wait(SHORT_DELAY_IN_MS)

            cy.get(circleContent)
                .eq(0)
                .should('contain', '')
                .should('contain', '0')
                .should('not.contain', 'head')

            cy.get(circleContent)
                .eq(1)
                .should('contain', '')
                .should('contain', '1')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(2)
                .should('contain', '')
                .should('contain', '2')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(3)
                .should('contain', '')
                .should('contain', '3')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(4)
                .should('contain', '')
                .should('contain', '4')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(5)
                .should('contain', '')
                .should('contain', '5')
                .should('not.contain', 'head');

            cy.get(circleContent)
                .eq(6)
                .should('contain', 'S7')
                .should('contain', '6')
                .should('contain', 'tail')
                .should('contain', 'head');
        })

        it('Очистить очередь работает корректно', () => {
            cy.get(inputEnterText).type('one');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('two');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('три');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('four');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('five');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('six');
            cy.contains('Добавить').click()
            cy.get(inputEnterText).type('S7');
            cy.contains('Добавить').click()
            cy.contains('Очистить').click();
            cy.get(stackList).should('have.length', 0)
        })
    })
})