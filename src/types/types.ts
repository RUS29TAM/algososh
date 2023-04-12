import {ElementStates} from "./element-states";

export interface ICircleDetail {
    symbol?: null | string;
    state: ElementStates;
}

export interface IColumn {
    number: number;
    state: ElementStates;
}
