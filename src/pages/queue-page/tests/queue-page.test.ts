import Queue from "../utils/queue";

describe("Создает новую очередь", () => {
    let queue: Queue<Number>;

    beforeEach(() => {
        // создадим новую очередь размером 3 перед каждым тестом
        // @ts-ignore
        queue = new Queue<number>(3);
    });

    describe('Постановка в очередь', () => {
        test('Добавляет элемент в очередь', () => {
            queue.enqueue(1);
            expect(queue.peak()).toBe(1);
            expect(queue.tail().item).toBe(1);
            expect(queue.head().item).toBe(1);
        });

        test('Выдает ошибку, если очередь заполнена', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            expect(() => queue.enqueue(4)).toThrow('Превышена максимальная длина очереди');
        });
    });

    describe('Выход из очереди', () => {
        test('Удаляет головной элемент из очереди', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            queue.dequeue();
            expect(queue.head().item).toBe(2);
            expect(queue.length).toBe(2);
        });

        test('Выдает ошибку, если очередь пуста', () => {
            expect(() => queue.dequeue()).toThrow('В очереди нет элементов');
        });
    });

    describe('Вершина стека', () => {
        test('Возвращает элемент head, не удаляя его', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            expect(queue.peak()).toBe(1);
            expect(queue.head().item).toBe(1);
            expect(queue.length).toBe(3);
        });

        test('Выдает ошибку, если очередь пуста', () => {
            expect(() => queue.peak()).toThrow('В очереди нет элементов');
        });
    });

    describe('Голова очереди', () => {
        test('возвращает элемент head и его индекс', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            const head = queue.head();
            expect(head.item).toBe(1);
            expect(head.index).toBe(0);
        });

        test('Выдает ошибку, если очередь пуста', () => {
            expect(() => queue.head()).toThrow
        })
    })
})
