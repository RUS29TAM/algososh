import React, {FormEvent, useEffect, useMemo, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import style from "./list-page.module.css";
import {Button} from "../../components/ui/button/button";
import {Input} from "../../components/ui/input/input";
import {randomChar} from "../../utils/random-char";
import {LinkedList} from "./utils/linked-list-node";
import {ElementStates} from "../../types/element-states";
import {setDelay} from "../../utils/set-delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../../components/ui/circle/circle";
import {ArrowIcon} from "../../components/ui/icons/arrow-icon";
import {TLinkedListElement} from "../../types/t-linked-list-element";
import {ICircleDetail} from "../../interfaces/i-circle-detail";
import {nanoid} from "nanoid";

export const ListPage: React.FC = () => {
        const [inputValue, setInputValue] = useState<string>('')
        const [inputValueIndex, setInputValueIndex] = useState<string>('')
        const [arrayCharacters, setArrayCharacters] = useState<ICircleDetail[]>([])
        const [stateList, setStateList] = useState<TLinkedListElement>({
            isAddByIndex: false,
            isAddHead: false,
            isAddTail: false,
            isDeleteByIndex: false,
            isDeleteHead: false,
            isDeleteTail: false
        });
        const maxLength = 12;
        const initialArray = useMemo(() => Array.from({length: 6}, () => `${randomChar()}`), [])
        const initialState: ICircleDetail[] = useMemo(() => [], [])
        const linkedList = useMemo(() => new LinkedList<string>(initialArray), [initialArray])

        useEffect(() => {
            initialArray.forEach((element) => {
                initialState.push({characters: element, state: ElementStates.Default});
            });
            setArrayCharacters(initialState.reverse());
        }, [initialArray, initialState]);

        const inLoading = useMemo<boolean>(() => !!Object.values(stateList).find((element) => element), [stateList])
        const addHead = async () => {//Добавить элемент в голову массива
            setStateList({...stateList, isAddHead: true});//разворачиваем стейт блокируем кнопку
            const array = [...arrayCharacters];//определяем масссив
            linkedList.prepend(inputValue);//вставляем в начало элемента другой элемент.
            array[0] = {...array[0], add: true, extra: {characters: linkedList.getNodeByIndex(0) || ''}}//определяем место для нового элемента в начале массива визуализируем изменения
            setArrayCharacters([...array]);//разворачиваем массив с новым элементом
            await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            array[0] = {...array[0], add: false, extra: undefined};//убираем визуализацию предыдущего действия
            array.unshift({characters: linkedList.getNodeByIndex(0) || '', state: ElementStates.Modified})//добавляем элемент в начало массива визуализируем изменения зеленым цветом
            setArrayCharacters([...array])//разворачиваем массив с новым элементом
            await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            array[0].state = ElementStates.Default;//возвращаем начальное визуальное состояние отображаемых элементов
            setStateList({...stateList, isAddHead: false})//разворачиваем стейт разблокируем блокируем кнопку
            setInputValue('')//очищаем инпут
        }
        const addTail = async () => {//Добавить элемент в хвост массива
            setStateList({...stateList, isAddTail: true})//разворачиваем стейт блокируем кнопку
            const array = [...arrayCharacters];//определяем масссив
            linkedList.append(inputValue);//вставляем в конец элемента другой элемент.
            const tailIndex = linkedList.sizeList() - 1//определяем место для нового элемента в конце массива
            for (let i = 0; i <= tailIndex; i++) {
                array[i] = {...array[i], add: true, extra: {characters: linkedList.getNodeByIndex(tailIndex) || ''}}//визуализируем - 'extra' как процесс добавления элемента над отображаемым массивом пока цикл не завершится
                if (i > 0) {
                    array[i - 1] = {...array[i - 1], add: false, extra: undefined, state: ElementStates.Changing}//убираем - 'extra' после каждой итерации, отображаем визуализацию сомого массива розовым цветом пока цикл не завершится и элемент не встанет на свое место.
                }
                setArrayCharacters([...array])//разворачиваем массив с новым элементом
                await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            }
            array[array.length - 1] = {//добавить элемент в хвост массива
                ...array[array.length],
                characters: linkedList.getNodeByIndex(tailIndex) || '',
                state: ElementStates.Modified,// подсветить зеленым, скрыть 'extra`
                add: false,
                extra: undefined
            }
            setArrayCharacters([...array]) //рендерим массив с новым элементом
            await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            array.forEach((element) => (element.state = ElementStates.Default))//возвращаем начальное визуальное состояние отображаемых элементов
            setStateList({...stateList, isAddTail: false})//разворачиваем стейт разблокируем блокируем кнопку
            setInputValue('')//очищаем инпут
        }
        const deleteHead = async () => {//удалить головной элемент из массива
            setStateList({...stateList, isDeleteHead: true})//разворачиваем стейт блокируем кнопку
            const array = [...arrayCharacters]//определяем масссив
            array[0] = {...array[0], characters: '', delete: true, extra: {characters: linkedList.deleteHead() || ''}}//определяем элемент в начале массива который удаляем визуализируем `extra` изменения
            setArrayCharacters([...array])//рендерим массив и элемент
            await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            array.shift() //удаляем первый элемент массива
            array[0].state = ElementStates.Modified // красим зеленым
            setArrayCharacters([...array])//рендерим массив и элемент
            await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            array[0].state = ElementStates.Default//возвращаем начальное визуальное состояние отображаемых элементов
            setStateList({...stateList, isDeleteHead: false})//разворачиваем стейт разблокируем блокируем кнопку
            setInputValue('')//очищаем инпут
        }
        const deleteTail = async () => {//удалить элемент из хвоста массива
            setStateList({...stateList, isDeleteTail: true})//разворачиваем стейт блокируем кнопку
            const array = [...arrayCharacters]//определяем масссив
            const {length} = array
            array[length - 1] = {//определяем элемент в хвосте массива который удаляем визуализируем `extra` изменения
                ...array[length - 1],
                characters: '',
                delete: true,
                extra: {characters: linkedList.deleteTail() || ''}
            }
            setArrayCharacters([...array])//рендерим массив и элемент
            await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            array.pop()//удаляем последний элемент из массива.
            array[length - 2].state = ElementStates.Modified//красим зеленым элемент который становиться хвостом
            setArrayCharacters([...array])//рендерим массив и элемент
            await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            array[length - 2].state = ElementStates.Default//возвращаем начальное визуальное состояние отображаемых элементов
            setStateList({...stateList, isDeleteTail: false})//разворачиваем стейт разблокируем блокируем кнопку
            setInputValue('')//очищаем инпут
        }
        const addByIndex = async (index: string) => {//Добавить элемент в массив по индексу
            setStateList({...stateList, isAddByIndex: true})//разворачиваем стейт блокируем кнопку
            const array = [...arrayCharacters]//определяем масссив
            linkedList.addByIndex(inputValue, Number(index))//вставляем элемент в другой по индексу.
            for (let i = 0; i <= Number(index); i++) {//визуализируем - 'extra' как процесс добавления элемента над отображаемым массивом пока цикл не завершится
                array[i] = {...array[i], add: true, extra: {characters: linkedList.getNodeByIndex(Number(index)) || ''}}
                if (i > 0) {//убираем - 'extra' после каждой итерации, отображаем визуализацию сомого массива розовым цветом пока цикл не завершится и элемент не встанет на свое место.
                    array[i - 1] = {...array[i - 1], add: false, extra: undefined, state: ElementStates.Changing}
                }
                setArrayCharacters([...array])//разворачиваем массив с новым элементом
                await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            }
            array[Number(index)] = {...array[Number(index)], add: false, extra: undefined}//убираем - 'extra' после завершения цикла
            array.splice(Number(index), 0, {characters: linkedList.getNodeByIndex(Number(index)) || '', state: ElementStates.Modified})//так-как вторым параметром мы ставим ноль, то элемент добавиться в массив по индексу, красим зеленым элемент в массиве
            setArrayCharacters([...array])//рендерим массив и элемент
            await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            array.forEach((element) => (element.state = ElementStates.Default))//пробегаемся по элементам и возвращаем для них начальное визуальное состояние
            setStateList({...stateList, isAddByIndex: false})//разворачиваем стейт разблокируем блокируем кнопку
            setInputValue('')//очищаем инпут для вода элемента
            setInputValueIndex('')//очищаем инпут для ввода индекса
        }
        const deleteByIndex = async (index: string) => {//Удалить элемент в массиве по индексу
            setStateList({...stateList, isDeleteByIndex: true})//разворачиваем стейт блокируем кнопку
            const array = [...arrayCharacters]//определяем масссив
            for (let i = 0; i <= Number(index); i++) {
                array[i].state = ElementStates.Changing//красим отображаемый массив розовым пока цикл не завершится
                i === Number(index) ? array[i].arrow = true : array[i].arrow = false//красим стрелку в розовый только до элемента который удаляется
                setArrayCharacters([...array])//разворачиваем массив с новым элементом
                await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            }
            array[Number(index)] = {//показываем `extra` для удаляемого элемента когда цикл завершился
                ...array[Number(index)],
                characters: '',
                delete: true,
                extra: {characters: linkedList.deleteByIndex(Number(index)) || ''}
            }
            setArrayCharacters([...array])//разворачиваем стейт разблокируем блокируем кнопку
            await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            array.splice(Number(index), 1)//первым параметром находим элемент по индексу и вторым параметром мы указываем сколько элементов необходимо удалить
            setArrayCharacters([...array])//разворачиваем массив с новым элементом
            await setDelay(SHORT_DELAY_IN_MS)//устаначливаем задержку
            array.forEach((element) => (element.state = ElementStates.Default))//пробегаемся по элементам и возвращаем для них начальное визуальное состояние
            setStateList({...stateList, isDeleteByIndex: false})//разворачиваем стейт блокируем кнопку
            setInputValue('')//очищаем инпут для вода элемента
            setInputValueIndex('')//очищаем инпут для ввода индекса
        }

        const onChange = (e: FormEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value)
        }
        const onChangeIndex = (e: FormEvent<HTMLInputElement>) => {
            setInputValueIndex(e.currentTarget.value)
        }

        return (
            <SolutionLayout title="Связный список">
                <div className={style.wrapper}>
                    <div className={style.container}>
                        <Input value={inputValue || ''}
                               type={'text'}
                               isLimitText={true}
                               maxLength={4}
                               style={{width: 204, marginRight: 12}}
                               placeholder={'Введите  значение'}
                               disabled={inLoading}
                               onChange={onChange}
                        >
                        </Input>
                        <section className={style.menu}>
                            <div className={style.btn}>
                                <Button type={'button'}
                                        text={'Добавить в head'}
                                        style={{width: 175}}
                                        onClick={() => addHead()}
                                        isLoader={stateList.isAddHead}
                                        disabled={!inputValue || inLoading || arrayCharacters.length > maxLength}
                                />
                                <Button type={'button'}
                                        text={'Добавить в tail'}
                                        style={{width: 175}}
                                        onClick={() => addTail()}
                                        isLoader={stateList.isAddTail}
                                        disabled={!inputValue || inLoading}
                                />
                                <Button type={'button'}
                                        text={'Удалить из head'}
                                        style={{width: 175}}
                                        onClick={() => deleteHead()}
                                        isLoader={stateList.isDeleteHead}
                                        disabled={arrayCharacters.length === 0 || inLoading}
                                />
                                <Button type={'button'}
                                        text={'Удалить из tail'}
                                        style={{width: 175}}
                                        onClick={() => deleteTail()}
                                        isLoader={stateList.isDeleteTail}
                                        disabled={arrayCharacters.length === 0 || inLoading}

                                />
                            </div>
                        </section>
                    </div>
                    <div className={style.container}>
                        <Input value={inputValueIndex || ''}
                               type={'number'}
                               onChange={onChangeIndex}
                               min={0}
                               max={arrayCharacters.length - 1}
                               style={{width: 204, marginRight: 12}}
                               placeholder={'Введите  индекс'}
                               disabled={inLoading}
                        >
                        </Input>
                        <section className={style.btn}>
                            <Button type={'button'}
                                    text={'Добавить по индексу'}
                                    style={{width: 362}}
                                    onClick={() => inputValueIndex && addByIndex(inputValueIndex)}
                                    disabled={!inputValue || !inputValueIndex || arrayCharacters.length > maxLength || inLoading || Number(inputValueIndex) > arrayCharacters.length - 1}
                                    isLoader={stateList.isAddByIndex}
                            />
                            <Button type={'button'}
                                    text={'Удалить по индексу'}
                                    style={{width: 362}}
                                    onClick={() => inputValueIndex && deleteByIndex(inputValueIndex)}
                                    isLoader={stateList.isDeleteByIndex}
                                    disabled={!inputValueIndex || arrayCharacters.length === 1 || inLoading || Number(inputValueIndex) > arrayCharacters.length - 1}
                            />
                        </section>
                    </div>
                </div>
                <ol className={style.elements}>
                    {arrayCharacters.map((characters, index) => {
                        return (
                            <li key={nanoid()} className={style.elementsWrapper}>
                                <Circle letter={characters.characters}
                                        index={index}
                                        state={characters.state}
                                        head={index === 0 && !characters.add && !characters.delete ? 'head' : ''}
                                        tail={index === arrayCharacters.length - 1 && !characters.add && !characters.delete ? 'tail' : ''}
                                />
                                {index !== arrayCharacters.length - 1 && (
                                    <ArrowIcon
                                        fill={characters.state === ElementStates.Changing && !characters.arrow ? '#d252e1' : '#0032FF'}
                                    />
                                )}
                                {characters.add && (
                                    <Circle letter={characters.extra?.characters}
                                            state={ElementStates.Changing}
                                            isSmall={true}
                                            extraClass={style.top}
                                    />
                                )}
                                {characters.delete && (
                                    <Circle letter={characters.extra?.characters}
                                            state={ElementStates.Changing}
                                            isSmall={true}
                                            extraClass={style.bottom}
                                    />
                                )}
                            </li>
                        )
                    })}
                </ol>
            </SolutionLayout>
        );
    };
