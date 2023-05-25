import {getFibArray} from "../utils/get-fib-array";

describe('Тест алгоритма последовательности чисел Фибоначчи', () => {
    it('Массив последовательности чисел возвращается корректно', () => {
        const resultArray = [1, 1, 2, 3, 5, 8];
        expect(getFibArray(5)).toStrictEqual(resultArray)
    });

    it('Возвращает пустой массив если значение <= 0', () => {
        const resultArray = [];
        expect(getFibArray(0)).toStrictEqual(resultArray)
    })

    it('Возвращает коректную последовательность для значения 1', () => {
        const resultArray = [1, 1];
        expect(getFibArray(1)).toStrictEqual(resultArray)
    })
});