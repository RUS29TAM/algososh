import {ILinkedList} from "../../interfaces/i-linked-list";

class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;

    constructor(value: T, next?: LinkedListNode<T> | null) {
        this.value = value;
        this.next = next === undefined ? null : next;
    }
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: LinkedListNode<T> | null;
    private size: number
    constructor(initialState?: T[]) {
        this.head = null;
        this.size = 0;
        initialState?.forEach((element) => {
            this.addByIndex(element, 0)
        });
    }

    addByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            throw new Error('Не корректное значение индекса')
        } else {
            let node = new LinkedListNode(element);
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let currentElement = this.head;
                let currentIndex = 0;
                let previousElement = null;

                while (currentIndex < index && currentElement) {
                    previousElement = currentElement;
                    currentElement = currentElement.next;
                    currentIndex++;
                }
                if (previousElement) {
                    previousElement.next = node;
                }
                node.next = currentElement;
            }
            this.size++;
        }
    }

    append(element: T): void {
        let node = new LinkedListNode(element)
        if (this.size === 0) {
            this.head = node;
        } else {
            let currentElement = this.head;
            while (currentElement && currentElement.next !== null) {
                currentElement = currentElement.next;
            }
            if (currentElement) {
                currentElement.next = new LinkedListNode(element)
            }
        }
        this.size++;
    }


    deleteByIndex(index: number) {
        if (index < 0 || index > this.size) {
            return null;
        }
        let currentElement = this.head;

        if (index === 0 && currentElement) {
            this.head = currentElement.next;
        } else {
            let previousElement = null;
            let currentIndex = 0;
            while (currentIndex < index && currentElement) {
                previousElement = currentElement;
                currentElement = currentElement.next;
                currentIndex++;
            }
            if (previousElement && currentElement) {
                previousElement.next = currentElement.next;
            }
        }
        this.size--;
        return currentElement ? currentElement.value : null;
    }

    deleteHead() {
        if (!this.head) return null;
        let deleteHead = this.head;
        if (this.head.next) {
            this.head = deleteHead.next;
        } else {
            this.head = null
        }
        this.size--;
        return deleteHead ? deleteHead.value : null;
    }

    deleteTail() {
        if (this.size === 0) return null;
        let currentElement = this.head;
        let previousElement = null;
        let currentIndex = 0;
        while (currentIndex < this.size - 1 && currentElement) {
            previousElement = currentElement;
            currentElement = currentElement.next;
            currentIndex++;
        }
        if (previousElement && currentElement) {
            previousElement.next = currentElement.next;
        }
        this.size--;
        return currentElement ? currentElement.value : null;
    }

    prepend(element: T) {
        let node = new LinkedListNode(element);
        if (!this.head) {
            this.head = node;
        }
        node.next = this.head;
        this.head = node;
        this.size++;
    }

    toArray() {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return nodes;
    }

    getNodeByIndex(index: number) {
        if (index < 0 || index > this.size) {
            return null;
        }
        let currentElement = this.head;
        let currentIndex = 0;
        while (currentIndex < index && currentElement) {
            currentElement = currentElement.next;
            currentIndex++;
        }
        return currentElement ? currentElement.value : null;
    }

    sizeList() {
        return this.size;
    }
}
