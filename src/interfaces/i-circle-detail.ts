import {ElementStates} from "../types/element-states";
export interface ICircleDetail {
    symbol?: null | string;
    state: ElementStates;
    head?: string;
    characters?: string | null;
    tail?: string;
    add?: boolean;
    delete?: boolean;
    arrow?: boolean;
    extra?: { characters: string }
}
