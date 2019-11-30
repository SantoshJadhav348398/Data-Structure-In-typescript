import { Entry } from "./Entry";

export class HashTable<T> {
    private table;
    
    constructor(private size = 10) {
        this.table = new Array<Entry<number, T>>(size);
    }

    private Hash (k : number){
        return k % this.size;
    }

    /**
     * Method put
     */
    public put(k:number, val : T): void {
       let offset : number = this.Hash(k);
           let nextEntry:Entry<number, T> = new Entry<number, T>(k, val);
       
       if (this.table[offset] != null)
           nextEntry.next = this.table[offset]
           
        this.table[offset] = nextEntry;
    }

    /**
     *    get method
     */
    public getEntry(k : number) : T {
        let offset = this.Hash(k);

        for (let current : Entry<number, T> = this.table[offset]; current != null; current = current.next){
            if (current.key == k){
                return current.value;
            }

        }

        return null;
       }

    /**
     * remove
     */
    public remove(k : number) : boolean{
        let offset = this.Hash(k);
        let prev : Entry<number, number> = null;
        for (let current : Entry<number, number> = this.table[offset]; current != null; prev = current, current = current.next)
        {
            if (current.key == k)
            {
                if (current == this.table[offset])
                    this.table[offset] = current.next;
                else{
                    prev.next = current.next;
                }
                return true;
            }
        }

        return false;
    }


}