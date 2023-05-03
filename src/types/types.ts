import {ElementStates} from "./element-states";

export interface ICircleDetail {
    symbol?: null | string;
    state: ElementStates;
    head?: string;
    characters?: string | null;
    tail?: string;
}

export interface IColumn {
    number: number;
    state: ElementStates;
}
