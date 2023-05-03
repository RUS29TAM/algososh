import React, {FormEvent, useMemo, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import style from "../string-page/string-page.module.css";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";
import {ICircleDetail} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import Queue from "../../utils/queue";
import {setDelay} from "../../utils/set-delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const QueuePage: React.FC = () => {

    const initialArray: ICircleDetail[] = Array.from({length: 7},() => ({characters: '', state: ElementStates.Default}));
    const [inputValue, setInputValue] = useState<string>('')
    const [arrayCharacters, setArrayCharacters] = useState<ICircleDetail[]>(initialArray)
    const [isLoading, setIsLoading] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const queue = useMemo(() => new Queue<string>(7), [])

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
     * @param e - Установить входящие значения, двухстороннее связывание.
     */
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const addElement = async () => {//добавляем элементы
        setIsLoading(true);//блокируем кнопки
        queue.enqueue(inputValue);//формируем элементы в двустороннюю очередь где элементы можно добавлять
        setInputValue('');//очищаем инпут для ввода новых значений
        const head = queue.head; //определяем голову в очереди элементов
        const tail = queue.tail; //определяем хвост в очереди элементов
        arrayCharacters[head().index].characters = head().item;//индексируем голову
        arrayCharacters[head().index].head = 'head';//подписываем голову
        if (tail().index > 0) arrayCharacters[tail().index - 1].tail = '';//убираем подпись "tail" для элементов с индексом больше 0 и последующих при добавлении.
        arrayCharacters[tail().index].characters = tail().item;//индексируем хвост
        arrayCharacters[tail().index].tail = 'tail';//подписываем хвост
        arrayCharacters[tail().index].state = ElementStates.Changing;//визуализируем изменения
        await setDelay(SHORT_DELAY_IN_MS);//устанавливаем задержку визуализации
        arrayCharacters[tail().index].state = ElementStates.Default;//возвращаем дефолтное состояние
        setIsLoading(false);//разблокируем кнопки
    };

    const deleteElement = async () => {//удаляем элементы
        setIsDelete(true);//блокируем кнопки
        const head = queue.head;//определяем голову в очереди элементов
        const tail = queue.tail;//определяем хвост в очереди элементов
        if (head().index === tail().index) {//возвращаем в первоначальное состояние после удаления всех элементов в очереди
            clear();
        } else {
            queue.dequeue();// формируем элементы в двустороннюю очередь где элементы можно удалять
            const head = queue.head;//определяем голову в очереди элементов
            arrayCharacters[head().index - 1].state = ElementStates.Changing;//визуализируем изменения
            await setDelay(SHORT_DELAY_IN_MS);//устанавливаем задержку визуализации
            arrayCharacters[head().index - 1].state = ElementStates.Default;//возвращаем дефолтное состояние
            if (head().index > 0) {//убираем подпись "head", значение для элементов с индексом больше 0 и последующих при удалении.
                arrayCharacters[head().index - 1].head = '';//пустая подпись
                arrayCharacters[head().index - 1].characters = '';//пустое значение
            }
            arrayCharacters[head().index].head = 'head';//подписываем голову
            arrayCharacters[head().index].characters = head().item;//индексируем голову
        }
        setIsDelete(false);//разблокируем кнопки
    }
    const clear = () => {//возвращаем в первоначальное состояние
        queue.clear();
        setArrayCharacters([...initialArray])
    }

    return (
        <SolutionLayout title="Очередь">
            <form className={style.wrapper}
                  onSubmit={onSubmit}>
                <Input value={inputValue || ''}
                       onChange={onChange}
                       type={'text'}
                       isLimitText={true}
                       maxLength={4}
                       style={{width: 377}}
                >
                </Input>
                <Button type={"submit"}
                        isLoader={isLoading}
                        disabled={!inputValue || isDelete || arrayCharacters[arrayCharacters.length - 1].characters !== ''}
                        text={'Добавить'}
                >
                </Button>
                <Button type={"button"}
                        disabled={isLoading || queue.isEmpty()}
                        text={'Удалить'}
                        isLoader={isDelete}
                        onClick={() => deleteElement()}
                >
                </Button>
                <Button type={"button"}
                        disabled={isLoading || isDelete || queue.isEmpty()}
                        text={'Очистить'}
                        style={{marginLeft: 68}}
                        onClick={() => clear()}
                >
                </Button>
            </form>
            <ol className={style.string} style={{flexWrap: "nowrap", paddingTop: 48}}>
                {arrayCharacters.map((characters, index) => {
                    return (
                        <li key={index}>
                            <Circle
                                letter={characters.characters}
                                index={index}
                                state={characters.state}
                                head={characters.head}
                                tail={characters.tail}
                            />
                        </li>
                    )
                })}
            </ol>
        </SolutionLayout>
    );
};
