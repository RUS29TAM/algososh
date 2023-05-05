import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {RadioInput} from "../../components/ui/radio-input/radio-input";
import {Button} from "../../components/ui/button/button";
import {Direction} from "../../types/direction";
import style from "../sorting-page/sorting-page.module.css";
import {IColumn} from "../../interfaces/i-column";
import {Column} from "../../components/ui/column/column";
import {ElementStates} from "../../types/element-states";
import {setDelay} from "../../utils/set-delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {swapArrayDetails} from "../../utils/swap-array-details";
import {array} from "./utils/get-array";
import {TSortingPageState} from "../../types/t-sorting-page-state";
import {nanoid} from "nanoid";

export const SortingPage: React.FC = () => {

    const [initialArray, setInitialArray] = useState<Array<IColumn>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [sorting, setSorting] = useState<string>('selection')
    const [stateList, setStateList] = useState<TSortingPageState>({
        isIncreasing: false,
        isDecreasing: false,
        isLoading: false,
    })

    const createArray = () => {//создадим массив с параметрами
        setInitialArray([...array(3, 17, 100)])
    }

    useEffect(() => {//отрисуем массив
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
        loadingSettings(true)//блокируем кнопку для нового массива
        sortingSettings === 'ascending'
            ? setStateList({...stateList, isIncreasing: true})//разворачиваем растущий стейт, блокируем кнопки
            : setStateList({...stateList, isDecreasing: true})//в противном случае разворачиваем стейт на понижение, блокируем кнопки

        const array = [...initialArray];//создаем копию массива
        array.forEach((element) => (element.state = ElementStates.Default))//пробегаемся по всем элементам и задаем начальное состояние - синий цвет

        for (let i = 0; i < array.length - 1; i++) {
            let minIndex = i;//i - наименьший по индексу элемент
            array[minIndex].state = ElementStates.Changing;//визуализируем изменения
            for (let j = i + 1; j < array.length; j++) {
                array[j].state = ElementStates.Changing;//визуализируем елемент
                initialArraySettings([...array]);//отрисовываем
                await setDelay(SHORT_DELAY_IN_MS);//устанавливаем задержку
                //сравниваем
                if ((sortingSettings === 'ascending' ? array[minIndex].number : array[j].number) > (sortingSettings === 'ascending' ? array[j].number : array[minIndex].number)) {
                    //после сравнения найден второй элемент на замену, i - визуализируем по дефолту синим
                    array[minIndex].state = i === minIndex ? ElementStates.Changing : ElementStates.Default;
                    minIndex = j;
                    initialArraySettings([...array]);//отрисовываем
                    await setDelay(SHORT_DELAY_IN_MS);//устанавливаем задержку
                }
                //визуализируем элемент имеющий максимальное значение в массиве
                if (j !== minIndex) {
                    array[j].state = ElementStates.Modified;//красим зеленым
                    initialArraySettings([...array]);//отрисовываем
                    await setDelay(SHORT_DELAY_IN_MS);//устанавливаем задержку
                }
            }
            if (i === minIndex) {
                array[i].state = ElementStates.Modified//красим зеленым
                initialArraySettings([...array]);//отрисовываем
                await setDelay(SHORT_DELAY_IN_MS);//устанавливаем задержку
            } else {//переставляем
                swapArrayDetails(array, minIndex, i);
                array[i].state = ElementStates.Modified
                initialArraySettings([...array]);//отрисовываем
                await setDelay(SHORT_DELAY_IN_MS);//устанавливаем задержку
                array[minIndex].state = ElementStates.Default //возвращаем начальное состояние - синий
                initialArraySettings([...array]);//отрисовываем
                await setDelay(SHORT_DELAY_IN_MS);//устанавливаем задержку
            }
        }
        array.forEach((element) => (element.state = ElementStates.Modified));//пробегаемся по всем элементам и звзвращаем начальное состояние - синий цвет
        loadingSettings(false);//разблокируем кнопку для нового массива
        sortingSettings === 'ascending' ? setStateList({...stateList, isIncreasing: false}) : setStateList({...stateList, isDecreasing: false}) //разворачиваем стейт разблокируем кнопки
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
        loadingSettings(true);//блокируем кнопку для нового массива
        sortingSettings === 'ascending'
            ? setStateList({...stateList, isIncreasing: true})//разворачиваем растущий стейт, блокируем кнопки
            : setStateList({...stateList, isDecreasing: true})//в противном случае разворачиваем стейт на понижение, блокируем кнопки

        //создаем копию массива
        const array = [...initialArray];
        array.forEach((element) => (element.state = ElementStates.Default));//пробегаемся по всем элементам и звзвращаем начальное состояние - синий цвет
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                //визуализируем сравниваемые элементы
                array[j].state = ElementStates.Changing;//красим розовым
                array[j + 1].state = ElementStates.Changing;//красим розовым
                initialArraySettings([...array]);//отрисовываем
                await setDelay(SHORT_DELAY_IN_MS)//устанавливаем задержку
                //сравниваем
                if ((sortingSettings === 'ascending' ? array[j].number : array[j + 1].number) > (sortingSettings === 'ascending' ? array[j + 1].number : array[j].number)) {
                    swapArrayDetails(array, j, j + 1);//меняем местами
                    initialArraySettings([...array]);// отрисовываем
                    await setDelay(SHORT_DELAY_IN_MS)//устанавливаем задержку
                }
                //возвращаем в начальное состояние после сравнения - синий цвет
                array[j].state = ElementStates.Default;
                array[j + 1].state = ElementStates.Default
                //визуализируем отрисованный в цикле
                if (j === array.length - i - 2) {
                    array[j + 1].state = ElementStates.Modified; //красим зеленым
                }
                initialArraySettings([...array]);// отрисовываем
                await setDelay(SHORT_DELAY_IN_MS);//устанавливаем задержку
            }
        }
        array.forEach((element) => (element.state = ElementStates.Modified))//пробегаемся по всем элементам и красим в зеленый
        loadingSettings(true);//разблокируем кнопку нового массива
        sortingSettings === 'ascending'
            ? setStateList({...stateList, isIncreasing: false})//разворачиваем растущий стейт, разблокируем кнопки
            : setStateList({...stateList, isDecreasing: false})// в противном сулчае разворачиваем стейт на понижение разблокируем кнопки
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
                {initialArray.map((element) => {
                    return (
                        <li key={nanoid()}>
                            <Column index={element.number} state={element.state}/>
                        </li>
                    )
                })}
            </ol>
        </SolutionLayout>
    );
};
