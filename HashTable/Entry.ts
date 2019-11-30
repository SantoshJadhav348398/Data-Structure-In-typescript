export class Entry{
    value : number;
    next : Entry;
    key:number

    constructor(k:number, val : number){
        this.value = val;
        this.next = null;
        this.key = k;
    }
}