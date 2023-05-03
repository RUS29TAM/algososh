import {ElementStates} from "../../types/element-states";
/**
 * array - генерирует случайный массив элементов
 * @param minLenght - минимальная длина массива
 * @param maxLenght - максимальная длина массива
 * @param maxArrayElement  - максимальное
 */
export const array = (minLenght: number, maxLenght: number, maxArrayElement: number) => {
    let rundomArray = [];
    const lenghtElements = Math.floor(Math.random() * (maxLenght - minLenght) + minLenght);
    for (let i = 0; i <= lenghtElements; i++) {
        rundomArray.push({
            number: Math.floor(Math.random() * (maxArrayElement + 1)),
            state: ElementStates.Default
        })
    }
    return rundomArray;
}
