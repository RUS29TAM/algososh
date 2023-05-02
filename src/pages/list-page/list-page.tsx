import React from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import style from "../sorting-page/sorting-page.module.css";
import {Button} from "../../components/ui/button/button";
import {Input} from "../../components/ui/input/input";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
        <form className={style.wrapper}>
            <Input value={'inputValue'}
                   type={'text'}
                   isLimitText={true}
                   maxLength={4}
                   style={{width: 377}}
            >
            </Input>
        <section className={style.menu}>
            <div className={style.btn}>
                <Button type={'submit'}
                        text={'По возрастанию'}
                        style={{minWidth: 205}}
                />
                <Button type={'submit'}
                        text={'По убыванию'}

                        style={{minWidth: 205}}
                />
                <Button type={'submit'}
                        text={'Новый массив'}

                        isLoader={false}

                />
            </div>
        </section>
        </form>
    </SolutionLayout>
  );
};
