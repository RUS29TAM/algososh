/**
 * getFibArray - вычисляет последовательность числе, первые два числа которой являются 0 и 1, а каждое последующее за ними число является суммой двух предыдущих
 * @param number - входящее числовое значение
 */
export const getFibArray = (number: number): number[] => {
    let result: number[] =[0, 1]
    for(let i = 2; i <= number + 1; i++) {
        result.push(result[i -2] + result[i -1])
    }
    return result.slice(1)
};
