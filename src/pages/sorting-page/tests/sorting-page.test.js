import {array} from "../utils/get-array";

describe('Тест алгоритма генерации случайного массива элементов', () => {
    test('выводит массив правильной длины', () => {
        const result = array(3, 6, 10);
        expect(result.length).toBeGreaterThanOrEqual(3);
        expect(result.length).toBeLessThanOrEqual(6);
    });

    test('выводит массив с элементами в ожидаемом диапазоне', () => {
        const result = array(3, 6, 10);
        expect(result.every(elem => elem.number <= 10)).toBe(true);
    });
});
