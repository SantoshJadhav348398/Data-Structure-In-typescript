import { Entry } from "./Entry";

export class HashTable {
    private table;
    
    constructor(private size = 10) {
        this.table = new Array<Entry>(size);
    }

    private Hash (k : number){
        return k % this.size;
    }

    /**
     * Method put
     */
    public put(k:number, val : number): void {
       let offset : number = this.Hash(k);
       let nextEntry:Entry = new Entry(k, val);
       
       if (this.table[offset] == null)
           this.table[offset] = nextEntry;
        else
        {
           nextEntry.next = this.table[offset];
           this.table[offset] = nextEntry;
        }
    }

    /**
     *    get method
     */
    public getEntry(k : number) : number {
        let offset = this.Hash(k);

        for (let current : Entry = this.table[offset]; current != null; current = current.next){
            if (current.key == k){
                return current.value;
            }

        }

        return -1;
       }

    /**
     * remove
     */
    public remove(k : number) : boolean{
        let offset = this.Hash(k);
        let prev : Entry = null;
        for (let current : Entry = this.table[offset]; current != null; prev = current, current = current.next)
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