import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import style from './string-page.module.css'
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {ElementStates} from "../../types/element-states";
import {ICircleDetail} from "../../types/types";
import {DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../../components/ui/circle/circle";
import {setDelay} from "../../utils/set-delay";
import {swapArrayDetails} from "../../utils/swap-array-details";

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
            let array = arrayElements, start = 0, end = array.length - 1; // -1 => предотвращаем ошибку ограждения элементов, известную как «выход за один».
            end >= start;
            start++, end--
        ) {
            if (end === start) {
                array[start].state = ElementStates.Modified;
                setArrayCharacters([...array]);
                await setDelay(DELAY_IN_MS);
                settingLoading(false);
            } else {//визуализируем действие
                array[start].state = ElementStates.Changing;
                array[end].state = ElementStates.Changing;
                setArrayCharacters([...array]);
                await setDelay(DELAY_IN_MS)
                //расставляяем элементы
                swapArrayDetails(array, start, end);
                //визуализируем действие
                array[start].state = ElementStates.Modified;
                array[end].state = ElementStates.Modified;
                setArrayCharacters([...array]);
                await setDelay(DELAY_IN_MS)
            }
        }
        settingLoading(false);
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
                {arrayCharacters.map((characters: ICircleDetail, index: number) => {
                    return (
                        <li key={index}>
                            <Circle letter={characters.symbol} state={characters.state}/>
                        </li>
                    )
                })}
            </ol>
        </SolutionLayout>
    );
};