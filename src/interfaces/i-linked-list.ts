export interface ILinkedList<T> {
    prepend: (element: T) => void;
    append: (element: T) => void;
    addByIndex: (element: T, index: number) => void;
    deleteByIndex: (index: number) => T | null;
    deleteHead: () => T | null
    deleteTail: () => T | null
    toArray: () => void
    getNodeByIndex: (index: number) => T | null
    sizeList: () => number
}
