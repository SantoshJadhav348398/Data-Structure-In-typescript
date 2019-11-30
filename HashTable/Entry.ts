export class Entry<T1,T2>{
    value : T2;
    next : Entry<T1, T2>;
    key:T1;

    constructor(k:T1, val : T2){
        this.value = val;
        this.next = null;
        this.key = k;
    }
}