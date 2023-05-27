interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    head: () => { item: T | null; index: number };
    tail: () => { item: T | null; index: number };
    isEmpty: () => void;
    clear: () => void;
}

export default class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private _head: number = 0;
    private _tail: number = 0;
    private readonly size: number = 0;
    length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size).fill('')
    }

    clear = () => {
        this._head = 0;
        this._tail = 0;
        this.length = 0;
    }

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error('В очереди нет элементов')
        }
        //delete this.container[this._head];
        this.container[this._head] = null;
        this._head++;
        this.length--;
    }
    isEmpty = () => this.length === 0;

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error('Превышена максимальная длина очереди')
        }
        this.container[this._tail] = item;
        this._tail++;
        this.length++;
    }

    head = () => {
        if (this.isEmpty()) {
            throw new Error('В очереди нет элементов')
        }
        return {item: this.container[this._head], index: this._head};
    }


    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error('В очереди нет элементов')
        }
        if (!this.isEmpty()) {
            return this.container[this._head]
        } else {
            return null
        }
    }

    tail = () => {
        if (this.isEmpty()) {
            throw new Error('В очереди нет элементов')
        }
        return {item: this.container[this._tail - 1], index: this._tail - 1}
    }
}
