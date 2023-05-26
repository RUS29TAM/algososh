import {Stack} from "../utils/stack";

describe('Stack', () => {
    let stack: Stack<string>;

    beforeEach(() => {
        stack = new Stack<string>();
    });

    it('Добавляет элементы в стек', () => {
        stack.push('Max');
        stack.push('Pain');
        expect(stack.size()).toBe(2);
    });

    it('Удаляет элементы из стека', () => {
        stack.push('Max');
        stack.push('Pain');
        stack.pop();
        expect(stack.size()).toBe(1);
    });

    it('Возвращает верхний элемент стека', () => {
        stack.push('Max');
        stack.push('Pain');
        expect(stack.peak()).toBe('Pain');
    });

    it('Возвращает null при вызове peak в пустом стеке', () => {
        expect(stack.peak()).toBeNull();
    });

    it('Возвращаетразмер стека', () => {
        stack.push('Max');
        stack.push('Pain');
        expect(stack.size()).toBe(2);
    });

    it('Очищает стек', () => {
        stack.push('Max');
        stack.push('Pain');
        stack.clear();
        expect(stack.size()).toBe(0);
    });
});
