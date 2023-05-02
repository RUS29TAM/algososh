import {ElementStates} from "./element-states";

export interface ICircleDetail {
    symbol?: null | string;
    state: ElementStates;
    head?: string;
    characters?: string | null;
}

export interface IColumn {
    number: number;
    state: ElementStates;
}
