import React, {useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import style from './string-page.module.css'
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";

export const StringComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [arrayCharacters, setArrayCharacters] = useState([])

    return (
        <SolutionLayout title="Строка">
            <form className={style.wrapper}
                  onSubmit={(e) => {
                      e.preventDefault();
                  }
                  }>
                <Input value={inputValue}
                       onChange={(e) => setInputValue(e.currentTarget.value)}
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
            <ul className={style.string}>

            </ul>

        </SolutionLayout>
    );
};
