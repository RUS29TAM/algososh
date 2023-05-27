import React, {FormEvent, useMemo, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import style from "../string-page/string-page.module.css";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";
import {Stack} from "./utils/stack";
import {ElementStates} from "../../types/element-states";
import {setDelay} from "../../utils/set-delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ICircleDetail} from "../../interfaces/i-circle-detail";
import {nanoid} from "nanoid";

export const StackPage: React.FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [arrayCharacters, setArrayCharacters] = useState<ICircleDetail[]>([])
    const [isDelete, setIsDelete] = useState(false)
    const stack = useMemo(() => new Stack<string>(), [])

    /**
     *
     * @param e - отправляет данные формы
     */
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addElement();
    }
    /**
     *
     * @param e -Установить входящие значения, двухстороннее связывание.
     */
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const addElement = async () => {//добавляем элементы
        setIsLoading(true);//блокируем кнопки
        stack.push(inputValue);//добавляем стэк в конец массива
        setInputValue('');//очищаем инпут для ввода новых значений
        arrayCharacters.forEach((element) => {//последовательно перебраем все элементы массива для визуализации по дефолту.
            element.head = '';//убираем подпись "top".
            element.state = ElementStates.Default;//возвращаем дефолтное состояние
        });
        const lastElement = stack.peak();//находим крайний добавленный эелмент
        arrayCharacters.push({ //добавляем его в стейт
            characters: lastElement ? lastElement : '',//если не находим, то оставляем пустым
            state: ElementStates.Default//возвращаем дефолтное состояние
        })
        arrayCharacters[arrayCharacters.length - 1].head = 'top';//меняем стейт для для головы
        arrayCharacters[arrayCharacters.length - 1].state = ElementStates.Changing;//визуализируем изменения
        setArrayCharacters([...arrayCharacters]);//разворачиваем массив
        await setDelay(SHORT_DELAY_IN_MS);//устанавливаем задержку визуализации
        arrayCharacters[arrayCharacters.length - 1].state = ElementStates.Default;//возвращаем дефолтное состояние
        setArrayCharacters([...arrayCharacters]);//разворачиваем массив
        setIsLoading(false);//разблокируем кнопки
    }

    const deleteElement = async () => {//удаляем элементы
        setIsDelete(true);//блокируем кнопки
        stack.pop();//удаляем последний элемент из массива
        if (stack.size()) {//ставим условие для массива
            arrayCharacters.pop();//удаляем последний элемент из массива
            arrayCharacters[arrayCharacters.length - 1].head = 'top'; //меняем стейт для для головы
            arrayCharacters[arrayCharacters.length - 1].state = ElementStates.Changing;//визуализируем изменения
            setArrayCharacters([...arrayCharacters])//разворачиваем массив
            await setDelay(SHORT_DELAY_IN_MS);//устанавливаем задержку визуализации
            arrayCharacters[arrayCharacters.length - 1].state = ElementStates.Default;//возвращаем дефолтное состояние
            setArrayCharacters([...arrayCharacters]);//разворачиваем массив
        } else {
            setArrayCharacters([])//или возвращаем пустой массив
        }
        setIsDelete(false);//разблокируем инпут
    }

    const clear = () => {//сбрасываем массив
        stack.clear();
        setArrayCharacters([])
    }

    return (
        <SolutionLayout title="Стек">
            <form className={style.wrapper}
                  onSubmit={onSubmit}>
                <Input value={inputValue || ''}
                       onChange={onChange}
                       type={'text'}
                       isLimitText={true}
                       maxLength={4}
                       style={{width: 377}}
                       disabled={isLoading || isDelete || arrayCharacters.length > 12}
                >
                </Input>
                <Button type={"button"}
                        isLoader={isLoading}
                        disabled={!inputValue || isDelete}
                        text={'Добавить'}
                        onClick={() => addElement()}
                >
                </Button>
                <Button type={"button"}
                        disabled={!arrayCharacters.length || isLoading || isDelete}
                        text={'Удалить'}
                        isLoader={isDelete}
                        onClick={() => deleteElement()}
                >
                </Button>
                <Button type={"button"}
                        disabled={isLoading || isDelete || !arrayCharacters.length}
                        text={'Очистить'}
                        style={{marginLeft: 68}}
                        onClick={() => clear()}
                >
                </Button>
            </form>
            <ol className={style.string} style={{flexWrap: "nowrap", paddingTop: 48}}>
                {arrayCharacters.map((characters, index) => {
                    return (
                        <li key={nanoid()}>
                            <Circle
                                letter={characters.characters}
                                index={index}
                                state={characters.state}
                                head={characters.head}
                            />
                        </li>
                    )
                })}
            </ol>
        </SolutionLayout>
    );
};
