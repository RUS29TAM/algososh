import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {RadioInput} from "../../components/ui/radio-input/radio-input";
import {Button} from "../../components/ui/button/button";
import {Direction} from "../../types/direction";
import style from "../sorting-page/sorting-page.module.css";
import {IColumn} from "../../types/types";
import {Column} from "../../components/ui/column/column";
import {ElementStates} from "../../types/element-states";
import {setDelay} from "../../utils/set-delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {swapArrayDetails} from "../../utils/swap-array-details";
import {array} from "../../utils/get-array";

type TSortingPageState = {
    isIncreasing: boolean;
    isDecreasing: boolean;
    isLoading: boolean;
}
export const SortingPage: React.FC = () => {

    const [initialArray, setInitialArray] = useState<Array<IColumn>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [sorting, setSorting] = useState<string>('selection')
    const [stateList, setStateList] = useState<TSortingPageState>({
        isIncreasing: false,
        isDecreasing: false,
        isLoading: false,
    })

    // function generateRandomArray(length: number, max: number): number[] {
    //     let arr: number[] = [];
    //     for (let i = 0; i < length; i++) {
    //         arr.push(Math.floor(Math.random() * max));
    //     }
    //     return arr;
    // }
    //
    // const randomArray = generateRandomArray(5, 10);
    //

    const createArray = () => {
        setInitialArray([...array(3, 17, 100)])
    }

    useEffect(() => {
        createArray()
    }, []);

    /**
     * selectionSorting - сортирует массив по выбору
     * @param sortingSettings - настройка сортировки
     * @param initialArray - массив по дефолту
     * @param initialArraySettings - Настройка элементов массива
     * @param loadingSettings - Настройка загрузки, блокировка кнопки
     */
    const selectionSorting = async (
        sortingSettings: 'ascending' | 'descending',
        initialArray: IColumn[],
        initialArraySettings: Dispatch<SetStateAction<IColumn[]>>,
        loadingSettings: Dispatch<SetStateAction<boolean>>
    ) => {
        sortingSettings === 'ascending'
            ? setStateList({...stateList, isIncreasing: true})
            : setStateList({...stateList, isDecreasing: true})
        loadingSettings(true)

        //создаем копию массива
        const array = [...initialArray];
        array.forEach((element) => (element.state = ElementStates.Default))

        for (let i = 0; i < array.length - 1; i++) {
            let minIndex = i;
            array[minIndex].state = ElementStates.Changing;
            for (let j = i + 1; j < array.length; j++) {
                //визуализируем елемент
                array[j].state = ElementStates.Changing;
                //отрисовываем
                initialArraySettings([...array]);
                await setDelay(SHORT_DELAY_IN_MS);
                //сравниваем
                if ((sortingSettings === 'ascending' ? array[minIndex].number : array[j].number) > (sortingSettings === 'ascending' ? array[j].number : array[minIndex].number)) {
                    //после сравнения найден второй элемент на замену, i - визуализируем по дефолту
                    array[minIndex].state = i === minIndex ? ElementStates.Changing : ElementStates.Default;
                    minIndex = j;
                    //отрисовываем
                    initialArraySettings([...array]);
                    await setDelay(SHORT_DELAY_IN_MS);
                }
                //визуализируем элемент имеющий максимальное значение в массиве
                if (j !== minIndex) {
                    array[j].state = ElementStates.Modified;
                    //отрисовываем
                    initialArraySettings([...array]);
                    await setDelay(SHORT_DELAY_IN_MS);
                }
            }
            if (i === minIndex) {
                array[i].state = ElementStates.Modified
                //отрисовываем
                initialArraySettings([...array]);
                await setDelay(SHORT_DELAY_IN_MS);
            } else {//переставляем
                swapArrayDetails(array, minIndex, i);
                array[i].state = ElementStates.Modified
                //отрисовываем
                initialArraySettings([...array]);
                await setDelay(SHORT_DELAY_IN_MS);
                array[minIndex].state = ElementStates.Default
                //отрисовываем
                initialArraySettings([...array]);
                await setDelay(SHORT_DELAY_IN_MS);
            }
        }
        array.forEach((element) => (element.state = ElementStates.Modified));
        loadingSettings(false);
        sortingSettings === 'ascending' ? setStateList({
            ...stateList,
            isIncreasing: false
        }) : setStateList({...stateList, isDecreasing: false})
    }

    /**
     * bubbleSorting - пузырьковая сортировка массива
     * @param sortingSettings - настройка сортировки
     * @param initialArray - массив по дефолту
     * @param initialArraySettings - Настройка элементов массива
     * @param loadingSettings - Настройка загрузки, блокировка кнопки
     */
    const bubbleSorting = async (
        sortingSettings: 'ascending' | 'descending',
        initialArray: IColumn[],
        initialArraySettings: Dispatch<SetStateAction<IColumn[]>>,
        loadingSettings: Dispatch<SetStateAction<boolean>>
    ) => {
        sortingSettings === 'ascending'
            ? setStateList({...stateList, isIncreasing: true})
            : setStateList({...stateList, isDecreasing: true})
        loadingSettings(true);

        //создаем копию массива
        const array = [...initialArray];
        array.forEach((element) => (element.state = ElementStates.Default));
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                //визуализируем сравниваемые элементы
                array[j].state = ElementStates.Changing;
                array[j + 1].state = ElementStates.Changing;
                // отрисовываем
                initialArraySettings([...array]);
                await setDelay(SHORT_DELAY_IN_MS);

                if ((sortingSettings === 'ascending' ? array[j].number : array[j + 1].number) > (sortingSettings === 'ascending' ? array[j + 1].number : array[j].number)) {
                    //меняем местами
                    swapArrayDetails(array, j, j + 1);
                    // отрисовываем
                    initialArraySettings([...array]);
                    await setDelay(SHORT_DELAY_IN_MS)
                }
                //убираем визуализацию после сравнения
                array[j].state = ElementStates.Default;
                array[j + 1].state = ElementStates.Default
                //визуализируем отрисованный в цикле
                if (j === array.length - i - 2) {
                    array[j + 1].state = ElementStates.Modified;
                }
                // отрисовываем
                initialArraySettings([...array]);
                await setDelay(SHORT_DELAY_IN_MS);
            }
        }
        array.forEach((element) => (element.state = ElementStates.Modified))
        loadingSettings(false);
        sortingSettings === 'ascending'
            ? setStateList({...stateList, isIncreasing: false})
            : setStateList({...stateList, isDecreasing: false})
    };

    return (
        <SolutionLayout title="Сортировка массива">
            <section className={style.menu}>
                <div className={style.radio}>
                    <RadioInput label={'Выбор'}
                                value={'selection'}
                                onChange={() => setSorting('selection')}
                                checked={sorting === 'selection'}
                    />
                    <RadioInput label={'Пузырёк'}
                                value={'bubble'}
                                onChange={() => setSorting('bubble')}
                                checked={sorting === 'bubble'}
                    />
                </div>
                <div className={style.btn}>
                    <Button type={'submit'}
                            text={'По возрастанию'}
                            sorting={Direction.Ascending}
                            onClick={() => sorting === 'selection'
                                ?
                                selectionSorting('ascending', initialArray, setInitialArray, setIsLoading)
                                :
                                bubbleSorting('ascending', initialArray, setInitialArray, setIsLoading)}
                            isLoader={stateList.isIncreasing}
                            disabled={stateList.isDecreasing}
                            style={{minWidth: 205}}
                    />
                    <Button type={'submit'}
                            text={'По убыванию'}
                            sorting={Direction.Ascending}
                            onClick={() => sorting === 'selection'
                                ?
                                selectionSorting('descending', initialArray, setInitialArray, setIsLoading)
                                :
                                bubbleSorting('descending', initialArray, setInitialArray, setIsLoading)}
                            isLoader={stateList.isDecreasing}
                            disabled={stateList.isIncreasing}
                            style={{minWidth: 205}}
                    />
                    <Button type={'submit'}
                            text={'Новый массив'}
                            onClick={() => createArray()}
                            isLoader={false}
                            disabled={isLoading}
                            style={{marginLeft: 68}}
                    />
                </div>
            </section>
            <ol className={style.diagram}>
                {initialArray.map((element, index) => {
                    return (
                        <li key={index}>
                            <Column index={element.number} state={element.state}/>
                        </li>
                    )
                })}
            </ol>
        </SolutionLayout>
    );
};
