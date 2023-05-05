import {DELAY_IN_MS} from "../constants/delays";

/**
 * setDelay - устанавлевает задержку
 * @param delay - значение задеркжи отображения
 */
export const setDelay = (delay: number = DELAY_IN_MS): Promise<null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, delay);
    })
};
