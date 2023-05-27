import React, {FormEvent, useRef, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import style from './string-page.module.css'
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../../components/ui/circle/circle";
import {getState, swapStringStep} from "./utils/get-state";

export const StringComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [swapValue, setSwapValue] = useState<string[][]>([])
    const [currentSwapValue, setCurrentSwapValue] = useState(0)
    const timerRef = useRef<NodeJS.Timeout>()

    const swapString = () => {
        const steps = swapStringStep(inputValue);
        setSwapValue(steps);
        setCurrentSwapValue(0);

        if (steps.length > 1) {
            timerRef.current = setInterval(() => {
                setCurrentSwapValue((currentValue) => {
                    const nextStep = currentValue + 1;
                    if (nextStep >= steps.length - 1 && timerRef.current) {
                        clearInterval(timerRef.current)
                    }
                    return nextStep;
                });
            }, DELAY_IN_MS);
        }
    };

    /**
     *
     * @param e - отправляет данные формы
     */
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        swapString();
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
                       disabled={currentSwapValue < swapValue.length - 1}
                >
                </Input>
                <Button type={"submit"}
                        disabled={!inputValue}
                        text={'Развернуть'}
                        isLoader={currentSwapValue < swapValue.length - 1}>
                </Button>
            </form>
            <ol className={style.string} style={{flexWrap: "nowrap"}}>
                {swapValue.length > 0 && swapValue[currentSwapValue].map((characters, index) => (
                    <li key={index}>
                        <Circle letter={characters}
                                state={getState(index, swapValue[currentSwapValue].length - 1, currentSwapValue, currentSwapValue === swapValue.length - 1)}/>
                    </li>)
                )}
            </ol>
        </SolutionLayout>
    );
};
