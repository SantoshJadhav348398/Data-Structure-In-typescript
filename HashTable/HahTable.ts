import { Entry } from "./Entry";

export class HashTable<V> {
    private table;
    private head;
    private tail;
    private root:Entry<number, V>;
    public static level = 0;
    
    constructor(private size = 10) {
        this.table = new Array<Entry<number, V>>(size);
        this.head = new Entry<number,V>(null, null);
        this.tail = new Entry<number, V>(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.root = null;
    }
    

    private Hash (k : number){
        return k % this.size;
    }

    /**
     * Method put
     */
    public put(k:number, val : V): void {
       let offset : number = this.Hash(k);
       let newEntry:Entry<number, V> = new Entry<number, V>(k, val);

       // List Implementation by adding new Entry
       newEntry.next = this.tail;
       newEntry.prev = this.tail.prev;
       this.tail.prev.next = newEntry;
       this.tail.prev = newEntry;
       
        // Tree implementation by adding new Entry
        this.root = this.AddNode(this.root, newEntry);

       if (this.table[offset] != null)
           newEntry.nextEntry = this.table[offset]
           
        this.table[offset] = newEntry;
    }

    private AddNode(TreeNode: Entry<number, V>, newEnt: Entry<number, V>, parentNode?: Entry<number, V>) : Entry<number, V>
    {
        
        if (null == TreeNode) 
            return newEnt;

        if (newEnt.key < TreeNode.key) { 
            TreeNode.left = this.AddNode(TreeNode.left, newEnt, TreeNode);
            
        }
        else {
            TreeNode.right = this.AddNode(TreeNode.right, newEnt, TreeNode);
            
        }
        return TreeNode;
    }

    /**
     *    get method
     */
    public getEntry(k : number, o: {returnValue}) : boolean {
        let offset = this.Hash(k);

        for (let current : Entry<number, V> = this.table[offset]; current != null; current = current.nextEntry){
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
                // Removing Entry from HashTable
                if (current == this.table[offset])
                    this.table[offset] = current.nextEntry;
                else{
                    prev.nextEntry = current.nextEntry;
                }

                // Removing Entry from list
                current.prev.next = current.next;
                current.next.prev = current.prev;

                // Removing Entry from Tree
                this.root = this.DeleteNode(this.root, k);
                return true;
            }
        }

        return false;
    }

    private DeleteNode(current:Entry<number, V>, k:number) : Entry<number, V>
    {
        if (null == current)
            return current;
        if (current.key > k)
            current.left = this.DeleteNode(current.left, k);
        else if (current.key < k)
            current.right = this.DeleteNode(current.right, k);
        else
        {
            // current Entry contains no child
            if (null == current.left && null == current.right)
                return null;
            
            // current Entry contains right child
            if (null == current.left && null != current.right)
            {
                let child = current.right;
                return child;
            }

            // current Entry contains left child
            if (null != current.left && null == current.right)
            {
                let child = current.left;
                return child;
            }

            // Current Entry contains both child
            current.right = this.AddNode(current.right, current.left);

            /* Current Entry is root 
            if (current == this.root) 
                return null;   
            */
           return current.right;
        }
        return current;
        
    }

    public DisplaySequence(): void
    {
         let List : string = "";
        
        for (let current : Entry<number, V> = this.head.next; current != this.tail; current = current.next)
        {   
            List += (current.value).toString();
            if (current.next != this.tail)
                List += " -> ";
        }
        console.log(List, "\n");
    }

    /**
     *   printing tree  */
    public Print() {
        this.PrintPed(this.root);
    }

    public PrintPed(current : Entry<number, V>) 
    {
        if (current)
        {
            let noOfSpace : string = "";
            HashTable.level += 1;
            this.PrintPed(current.right);
            for (let index = 0; index < HashTable.level; index++)
                 noOfSpace += "  ";
            //console.log(noOfSpace);
            console.log(`${noOfSpace}${current.value}\n`);
            
            this.PrintPed(current.left); 
            HashTable.level -= 1;
        }
    }

}