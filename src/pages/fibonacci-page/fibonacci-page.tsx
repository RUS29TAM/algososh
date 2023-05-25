import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import style from "../string-page/string-page.module.css";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";
import {setDelay} from "../../utils/set-delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {getFibArray} from "./utils/get-fib-array";
import {nanoid} from "nanoid";

export const FibonacciPage: React.FC = () => {
    const [inputValue, setInputValue] = useState<number>()
    const [arrayNum, setArrayNum] = useState<number[]>([])
    const [isLoading, setIsLoading] = useState(false)

    /**
     * @param e -отправляет данные формы
     */
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        inputValue && calculateFibonacci(inputValue, setInputValue, setArrayNum, setIsLoading)
    }
    /**
     * @param e - Установить входящие значения, двухстороннее связывание.
     */
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInputValue(Number(e.currentTarget.value))
    }

    /**
     * calculateFibonacci -  вычисляет последовательность числе, первые два числа которой являются 0 и 1, а каждое последующее за ними число является суммой двух предыдущих
     * @param inputValue - Входящие параметры
     * @param settingInputValues - Настройка входящих значений, очистка.
     * @param settingArrayNum - Настройка элементов массива
     * @param settingLoading - Настройка загрузки, блокировка кнопки
     */
    const calculateFibonacci = async (
        inputValue: number,
        settingInputValues: Dispatch<SetStateAction<number | undefined>>,
        settingArrayNum: Dispatch<SetStateAction<number[]>>,
        settingLoading: Dispatch<SetStateAction<boolean>>
    ) => {
        settingInputValues(0)
        settingLoading(true);//блокируем кнопку
        const resultArray = [...getFibArray(inputValue)]//вычисляем последовательность числел в введенных значениях и прогоняем через функцию Фиббоначи
        const renderResultArray: number[] = []; //создаем результирующий массив
        for(let element of resultArray) {
            renderResultArray.push(element)//вставляем елемент в результирующий массив
            settingArrayNum([...renderResultArray])//оррисовываем
            await setDelay(SHORT_DELAY_IN_MS)//устанавливаем задержку
        }
        settingLoading(false)//разблокируем кнопку
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <form className={style.wrapper}
                  onSubmit={onSubmit}>
                <Input value={inputValue}
                       onChange={onChange}
                       type={'number'}
                       isLimitText={true}
                       max={19}
                       placeholder={'Введите число'}
                >
                </Input>
                <Button type={"submit"}
                        disabled={!inputValue || inputValue > 19}
                        text={'Рассчитать'}
                        isLoader={isLoading}>
                </Button>
            </form>
            <ol className={style.string} style={{paddingTop: 48}}>
                {arrayNum.map((number:number, index:number) => {
                    return (
                        <li key={nanoid()}>
                            <Circle letter={number.toString()} index={index}/>
                        </li>
                    )
                })}
            </ol>
        </SolutionLayout>
    );
};
