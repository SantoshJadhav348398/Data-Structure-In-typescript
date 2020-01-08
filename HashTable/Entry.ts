export class Entry<K, V>{
    value : V;
    nextEntry : Entry<K, V>;
    key:K;
    next : Entry<K, V>;
    prev : Entry<K, V>;
    left : Entry<K, V>;
    right: Entry<K, V>;
     

    constructor(k:K, val : V){
        this.value = val;
        this.nextEntry = null;
        this.key  = k;
        this.next = null;
        this.prev = null;
        this.left = null;
        this.right= null;
    }
}