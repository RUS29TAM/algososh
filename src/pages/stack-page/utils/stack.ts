interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    size: () => number;
    clear: () => void;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];
    push = (item: T): void => {
        this.container.push(item)
    };

    pop = (): void => {
        this.container.pop();
    }

    peak = (): T | null => {
        if (this.container.length) {
            return this.container[this.container.length - 1];
        } else {
            return null;
        }
    }

    size = () => this.container.length;


    clear = () => this.container = []
}

export const stack = new Stack<string>();
