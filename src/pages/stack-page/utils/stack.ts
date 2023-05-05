interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
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

    get size() {
        return this.container.length;
    }

    clear = () => this.container = []

    getSize(): number {
        return 0;
    }
}

export const stack = new Stack<string>();
