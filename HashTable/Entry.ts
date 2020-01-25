/**
 * Entry Node has 7 properties
 * It has {key, value} pair
 * NextEntry: points to the next Entry for in case of collision.
 * Next and prev used to point the next and previous Entry to get the Sequence in HashTable.
 * Left and Right used to point left and right subTree in order to get default sorting.
 * balance : balanace factor of each
 */

export class Entry<K, V>{
    value: V;
    nextEntry: Entry<K, V>;
    key: K;
    next: Entry<K, V>;
    prev: Entry<K, V>;
    left: Entry<K, V>;
    right: Entry<K, V>;
    balance: number;
     

    constructor(k:K, val: V){
        this.value = val;
        this.nextEntry = null;
        this.key  = k;
        this.next = null;
        this.prev = null;
        this.left = null;
        this.right= null;
        this.balance = 0;
    }
}