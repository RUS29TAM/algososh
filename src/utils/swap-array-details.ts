import {ICircleDetail, IColumn} from "../types/types";

/**
 * swapArrayDetails - меняет местами элементы массива
 * @param array - массив элементов
 * @param firstIndex - индекс первого элемента массива
 * @param secondIndex - индекс второго элемента массива
 */
export const swapArrayDetails = (
    array: ICircleDetail[] | IColumn[],
    firstIndex: number,
    secondIndex: number,
): void => {
    [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]]
}
