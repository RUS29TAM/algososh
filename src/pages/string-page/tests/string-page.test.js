import {swapStringStep} from "../utils/get-state";

const resultEvenArray = [
    ['P', 'A', 'I', 'N'],
    ['N', 'A', 'I', 'P'],
    ['N', 'I', 'A', 'P'],
];

const resultOddArray = [
    ['M', 'A', 'X', 'P', 'A', 'I', 'N'],
    ['N', 'A', 'X', 'P', 'A', 'I', 'M'],
    ['N', 'I', 'X', 'P', 'A', 'A', 'M'],
    ['N', 'I', 'A', 'P', 'X', 'A', 'M'],
    ['N', 'I', 'A', 'P', 'X', 'A', 'M'],
];

const resultArrayOne = [['!']];

describe("Тест для алгоритма разворота строки", () => {
    it("Массив с четным количеством символов - тест пройден", () => {
        expect(swapStringStep("PAIN")).toEqual(resultEvenArray);
    });

    it("Массив с нечетным количеством символов - тест пройден", () => {
        expect(swapStringStep('MAXPAIN')).toEqual(resultOddArray);
    });

    it("Массив с нечетным количеством символов - тест пройден", () => {
        expect(swapStringStep("!")).toEqual(resultArrayOne);
    });
});
