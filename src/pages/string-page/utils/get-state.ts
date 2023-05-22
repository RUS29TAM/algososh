import {ElementStates} from "../../../types/element-states";

export function getState(index: number, maxIndex: number, currentValue: number, isFinally: boolean): ElementStates {
    switch (true) {
        case (index < currentValue || index > maxIndex - currentValue || isFinally):
            return ElementStates.Modified;
        case (index === currentValue || index === maxIndex - currentValue):
            return ElementStates.Changing;
        default:
            return ElementStates.Default;
    }
}

export function swapStringStep(inputString: string): string[][] {
    let inputCharacters = inputString.split('');
    const swapStep: string[][] = [[...inputCharacters]];

    if (inputString.length <= 1) {
        return [[...inputString]]
    }

    for (let i = 0; i < inputString.length / 2; i++) {
        const j = inputString.length - 1 - i;
        const temp = inputCharacters[i];
        inputCharacters[i] = inputCharacters[j];
        inputCharacters[j] = temp;
        swapStep.push([...inputCharacters]);
    }
    return swapStep;
}

