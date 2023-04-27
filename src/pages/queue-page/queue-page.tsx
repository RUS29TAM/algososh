import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import style from "../string-page/string-page.module.css";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";

export const QueuePage: React.FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
  return (
    <SolutionLayout title="Очередь">
        <form className={style.wrapper}
              onSubmit={onSubmit}>
            <Input value={inputValue}
                   onChange={onChange}
                   type={'text'}
                   isLimitText={true}
                   maxLength={4}
                   style={{width: 377}}
            >
            </Input>
            <Button type={"submit"}
                    disabled={!inputValue}
                    text={'Добавить'}
                    isLoader={isLoading}>
            </Button>
            <Button type={"button"}
                    disabled={!inputValue}
                    text={'Удалить'}
                    isLoader={isLoading}>
            </Button>
            <Button type={"button"}
                    disabled={!inputValue}
                    text={'Очистить'}
                    isLoader={isLoading}
                    style={{marginLeft: 68}}
            >
            </Button>
        </form>
    </SolutionLayout>
  );
};
