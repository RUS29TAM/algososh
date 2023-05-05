import React, {FormEvent, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import style from "./list-page.module.css";
import {Button} from "../../components/ui/button/button";
import {Input} from "../../components/ui/input/input";
import {Circle} from "../../components/ui/circle/circle";
import {ArrowIcon} from "../../components/ui/icons/arrow-icon";
import {TLinkedListElement} from "../../types/t-linked-list-element";
import {ICircleDetail} from "../../interfaces/i-circle-detail";

//def
export const ListPage: React.FC = () => {
        const [inputValue, setInputValue] = useState<string>('')
        const [inputValueIndex, setInputValueIndex] = useState<number>()
        const [arrayCharacters, setArrayCharacters] = useState<ICircleDetail[]>([])
        const [stateList, setStateList] = useState<TLinkedListElement>({
            isAddByIndex: false,
            isAddHead: false,
            isAddTail: false,
            isDeleteByIndex: false,
            isDeleteHead: false,
            isDeleteTail: false
        });

        const onChange = (e: FormEvent<HTMLInputElement>) => {
            setInputValue(e.currentTarget.value)
        }
        const onChangeIndex = (e: FormEvent<HTMLInputElement>) => {
            setInputValueIndex(Number(e.currentTarget.value))
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
                               onChange={onChange}
                        >
                        </Input>
                        <section className={style.menu}>
                            <div className={style.btn}>
                                <Button type={'button'}
                                        text={'Добавить в head'}
                                        style={{width: 175}}
                                        isLoader={stateList.isAddHead}
                                />
                                <Button type={'button'}
                                        text={'Добавить в tail'}
                                        style={{width: 175}}
                                        isLoader={stateList.isAddTail}
                                />
                                <Button type={'button'}
                                        text={'Удалить из head'}
                                        style={{width: 175}}
                                        isLoader={stateList.isDeleteHead}
                                />
                                <Button type={'button'}
                                        text={'Удалить из tail'}
                                        style={{width: 175}}
                                        isLoader={stateList.isDeleteTail}
                                />
                            </div>
                        </section>
                    </div>
                    <div className={style.container}>
                        <Input value={inputValueIndex || ''}
                               type={'text'}
                               onChange={onChangeIndex}
                               maxLength={1}
                               style={{width: 204, marginRight: 12}}
                               placeholder={'Введите  индекс'}
                        >
                        </Input>
                        <section className={style.btn}>
                            <Button type={'button'}
                                    text={'Добавить по индексу'}
                                    style={{width: 362}}
                                    isLoader={stateList.isAddByIndex}
                            />
                            <Button type={'button'}
                                    text={'Удалить по индексу'}
                                    style={{width: 362}}
                                    isLoader={stateList.isDeleteByIndex}
                            />
                        </section>
                    </div>
                </div>
                <ol className={style.elements}>

                    <li key={'index'} className={style.elementsWrapper}>
                        <Circle/>
                        <ArrowIcon/>
                        <Circle isSmall={true}
                                extraClass={style.top}/>
                        <Circle isSmall={true}
                                extraClass={style.bottom}/>
                    </li>
                </ol>
            </SolutionLayout>
        );
    }
;
