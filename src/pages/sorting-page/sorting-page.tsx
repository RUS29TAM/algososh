import React, {useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import {RadioInput} from "../../components/ui/radio-input/radio-input";
import {Button} from "../../components/ui/button/button";
import {Direction} from "../../types/direction";
import style from "../string-page/string-page.module.css";
import {IColumn} from "../../types/types";

export const SortingPage: React.FC = () => {

    const [initialArray, setInitialArray] = useState<Array<IColumn>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [sorting, setSorting] = useState<string>('selection')
    const [stateList, setStateList] = useState()

    return (
        <SolutionLayout title="Сортировка массива">
            <RadioInput label={'Выбор'}
                        value={'selection'}
            />
            <RadioInput label={'Пузырёк'}
                        value={'bubble'}
            />
            <Button type={'submit'}
                    text={'По возрастанию'}
                    sorting={Direction.Ascending}
            />
            <Button type={'submit'}
                    text={'По убыванию'}
                    sorting={Direction.Ascending}
            />
            <Button type={'submit'}
                    text={'Новый массив'}
            />
            <ol className={style.string}>

            </ol>
        </SolutionLayout>
    );
};
