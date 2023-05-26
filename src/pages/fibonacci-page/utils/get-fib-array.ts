/**
 * getFibArray - вычисляет последовательность числе, первые два числа которой являются 0 и 1, а каждое последующее за ними число является суммой двух предыдущих
 * @param number - входящее числовое значение
 */
export const getFibArray = (number: number): number[] => {
    if (number <= 0) return [];
    let result: number[] = [0, 1]
    for (let i = 2; i <= number + 1; i++) {
        result.push(result[i - 2] + result[i - 1])
    }
    return result.slice(1)
};

/** Последовательность Фибоначчи определена только для неотрицательных целых чисел.
 Реализовать функцию, которая ведет себя как последовательность Фибоначчи для отрицательных чисел,
 возможно с помощью альтернативной последовательности, такой как последовательность Лукаса.
 */

// export const getLucasArray = (number: number): number[] => {
//     let result: number[] = [2, 1];
//     for (let i = 2; i <= Math.abs(number) + 1; i++) {
//         result.push(result[i - 2] + result[i - 1]);
//     }
//     if (number < 0) {
//         result = result.map((x, i) => i % 2 === 0 ? -x : x);
//         result[0] = -result[0];
//     }
//     return result.slice(1);
// };
