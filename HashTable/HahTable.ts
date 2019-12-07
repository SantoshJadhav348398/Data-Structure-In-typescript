import { Entry } from "./Entry";

export class HashTable<T> {
    private table;
    private head;
    private tail;
    
    constructor(private size = 10) {
        this.table = new Array<Entry<number, T>>(size);
        this.head = new Entry<number,T>(null, null);
        this.tail = new Entry<number, T>(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    

    private Hash (k : number){
        return k % this.size;
    }

    /**
     * Method put
     */
    public put(k:number, val : T): void {
       let offset : number = this.Hash(k);
       let newEntry:Entry<number, T> = new Entry<number, T>(k, val);

       // List Implementation by adding new Entry
       newEntry.next = this.tail;
       newEntry.prev = this.tail.prev;
       this.tail.prev.next = newEntry;
       this.tail.prev = newEntry;
       
       if (this.table[offset] != null)
           newEntry.nextEntry = this.table[offset]
           
        this.table[offset] = newEntry;
    }

    /**
     *    get method
     */
    public getEntry(k : number, o: {returnValue}) : boolean {
        let offset = this.Hash(k);

        for (let current : Entry<number, T> = this.table[offset]; current != null; current = current.nextEntry){
            if (current.key == k){
                o.returnValue = current.value;
                return true;
            }

        }

        return false;
       }

    /**
     * remove
     */
    public remove(k : number) : boolean{
        let offset = this.Hash(k);
        let prev : Entry<number, number> = null;
        for (let current : Entry<number, number> = this.table[offset]; current != null; prev = current, current = current.nextEntry)
        {
            if (current.key == k)
            {
                if (current == this.table[offset])
                    this.table[offset] = current.nextEntry;
                else{
                    prev.nextEntry = current.nextEntry;
                }

                //Removing from list
                current.prev.next = current.next;
                current.next.prev = current.prev;
                return true;
            }
        }


        return false;
    }

    public DisplaySequence(): void
    {
        for (let current:Entry<number, T> = this.head.next; current != this.tail; current = current.next)
            console.log(current.value);
    }

}