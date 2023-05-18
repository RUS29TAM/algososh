describe('Запуск приложения', () => {
    it('Отрисовка главной страницы - тест пройден', () => {
        cy.visit('/')
        cy.contains('МБОУ АЛГОСОШ')
        cy.get('a[href*="/recursion"]')
        cy.get('a[href*="/fibonacci"]')
        cy.get('a[href*="/sorting"]')
        cy.get('a[href*="/stack"]')
        cy.get('a[href*="/queue"]')
        cy.get('a[href*="/list"]')
        cy.contains('Вдохновлено школами, в которых не учили алгоритмам')
        cy.contains('© RUS29TAM Сделано в Практикуме.')
    })
})