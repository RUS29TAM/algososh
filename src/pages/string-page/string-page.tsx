import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import style from './string-page.module.css'
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../../components/ui/circle/circle";
import {setDelay} from "../../utils/set-delay";
import {swapArrayDetails} from "../../utils/swap-array-details";
import {ICircleDetail} from "../../interfaces/i-circle-detail";
import {nanoid} from "nanoid";

export const StringComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [arrayCharacters, setArrayCharacters] = useState<Array<ICircleDetail>>([])
    /**
     * swapString - переворачивает строку
     * @param inputValue - Входящие параметры
     * @param settingInputValues - Настройка входящих значений, очистка.
     * @param settingArrayCharacters - Настройка элементов массива
     * @param settingLoading - Настройка загрузки, блокировка кнопки
     */
    const swapString = async (
        inputValue: string,
        settingInputValues: Dispatch<SetStateAction<string>>,
        settingArrayCharacters: Dispatch<SetStateAction<ICircleDetail[]>>,
        settingLoading: Dispatch<SetStateAction<boolean>>
    ) => {
        settingInputValues('')
        settingLoading(true)
        const arrayElements: ICircleDetail[] = [];
        inputValue.split('').forEach((symbol) => {
            arrayElements.push({symbol: symbol, state: ElementStates.Default});
        })
        settingArrayCharacters([...arrayElements]);

        await setDelay();

        for (
            let array = arrayElements, start = 0, end = array.length - 1; // -1 => предотвращаем ошибку ограждения элементов, известную как «выход за один». Определяем начало и конец в массиве
            end >= start; //хвост должен быть больше или равен голове
            start++, end--//услтанавливаем оператор приращения и уменьшения
        ) {
            if (end === start) {//после завершения
                array[start].state = ElementStates.Modified;//красим зеленым
                setArrayCharacters([...array]);//рендерим массив
                await setDelay(DELAY_IN_MS);//устанавдиваем задержку
                settingLoading(false);//разблокируем кнопку
            } else {//визуализируем действие
                array[start].state = ElementStates.Changing;//красим розовым
                array[end].state = ElementStates.Changing;//красим розовым
                setArrayCharacters([...array]);//рендерим массив
                await setDelay(DELAY_IN_MS)//устанавдиваем задержку
                swapArrayDetails(array, start, end);//меняем местами элементы массива
                //визуализируем действие
                array[start].state = ElementStates.Modified;//красим зеленым
                array[end].state = ElementStates.Modified;//красим зеленым
                setArrayCharacters([...array]);//рендерим массив
                await setDelay(DELAY_IN_MS)//устанавдиваем задержку
            }
        }
        settingLoading(false);//разблокируем кнопку
    }

    /**
     *
     * @param e - отправляет данные формы
     */
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        swapString(inputValue, setInputValue, setArrayCharacters, setIsLoading);
    }
    /**
     *
     * @param e Установить входящие значения, двухстороннее связывание.
     */
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        <SolutionLayout title="Строка">
            <form className={style.wrapper}
                  onSubmit={onSubmit}>
                <Input value={inputValue}
                       onChange={onChange}
                       type={'text'}
                       isLimitText={true}
                       maxLength={11}
                >
                </Input>
                <Button type={"submit"}
                        disabled={!inputValue}
                        text={'Развернуть'}
                        isLoader={isLoading}>
                </Button>
            </form>
            <ol className={style.string} style={{flexWrap: "nowrap"}}>
                {arrayCharacters.map((characters: ICircleDetail) => {
                    return (
                        <li key={nanoid()}>
                            <Circle letter={characters.symbol} state={characters.state}/>
                        </li>
                    )
                })}
            </ol>
        </SolutionLayout>
    );
};
