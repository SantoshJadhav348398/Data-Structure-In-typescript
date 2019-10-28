import { ListNode } from "../SingleLinkedList/ListNode";

export class SentinelLinkedList {
    //instance member
    private head : ListNode;
    private tail : ListNode;

    constructor() {
        // Initialising dummy node in List
        this.head = new ListNode(0);
        this.tail = new ListNode(0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
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
        return true;
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