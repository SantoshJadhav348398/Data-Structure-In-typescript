import { ListNode } from "../SingleLinkedList/ListNode";

export class SentinelLinkedList {
    //instance member
    private head : ListNode;
    private tail : ListNode;
    private size : number;

    constructor() {
        // Initialising dummy node in List
        this.head = new ListNode(0);
        this.tail = new ListNode(0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size = 0;
    }

    public AddToBack(value : number): boolean
    {
        // creating a node
        let newNode = new ListNode(value);
        
        // check for newNode is created or not
        if (null == newNode)           
            return false;
        
        // assign newNode to the end of the List
        newNode.next = this.tail;
        newNode.prev = this.tail.prev;
        this.tail.prev.next = newNode;
        this.tail.prev = newNode;
        this.size += 1;
        return true;
    }

    public AddToFront(value : number) : boolean
    {
        // Creating newNode        
        let newNode = new ListNode(value);

        // Check for newNode is Created
        if (null == newNode)
            return false;

        // Assign newNode to Start of the List
        newNode.prev = this.head;
        newNode.next = this.head.next;
        this.head.next.prev = newNode;
        this.head.next = newNode;
        this.size += 1;
        return true;
    }

    /**
     * DeleteNode */
    public DeleteNode(val : number) : boolean {
        
        for (let current : ListNode = this.head.next; current != this.tail; current = current.next)
        {
            if (current.value == val)
            {
                current.prev.next = current.next;
                current.next.prev = current.prev;
                this.size -= 1;
                return true;
            }
        }

        return false;
    }

    /**
     * Update
     */
    public Update(searchValue : number, value : number) : boolean{
        
        for (let current : ListNode = this.head.next; current != this.tail; current = current.next)
        {
            if (current.value == searchValue)
            {
                current.value = value;
                return true;
            }
        }

        return false;
    }
    
    /**
     * printFoward
     */
    public printFoward() {
        let List : string = "";
        
        for (let current : ListNode = this.head.next; current != this.tail; current = current.next)
            List += (current.value).toString() + "\t";
       
        console.log(List, "\n");
             
    }
    
    public getSize():number
    {
        return this.size;
    }
    /**
     * printBackward  
     */
    public printBackward() {
        let List : string = "";

        for (let current : ListNode = this.tail.prev; current != this.head; current = current.prev)
            List += current.value.toString() + "\t";
        
        console.log(List, "\n");
    }
}