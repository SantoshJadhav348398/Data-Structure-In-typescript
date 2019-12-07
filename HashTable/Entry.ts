export class Entry<T1,T2>{
    value : T2;
    nextEntry : Entry<T1, T2>;
    key:T1;
    next : Entry<T1, T2>;
    prev : Entry<T1, T2>;

    constructor(k:T1, val : T2){
        this.value = val;
        this.nextEntry = null;
        this.key = k;
        this.next = null;
        this.prev = null;
    }
}