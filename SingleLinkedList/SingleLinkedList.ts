import { ListNode } from "./ListNode";

export class SingleLinkedList
{
    head : ListNode;
    tail : ListNode;
    
    SingleLinkedList()
    {
        this.head = this.tail = null;
    }

     AddToBack(val):boolean
    {
        let newNode = new ListNode(val);

        if (null == newNode)
            return false;

        if (null == this.head)
            this.head = newNode;
        
        else
            this.tail.next =  newNode;
        
        this.tail = newNode;

        return true;
    }

    AddToFront(val:number):boolean
    {
        let newNode = new ListNode(val);

        if (null == newNode)
            return false;

        if (null == this.tail)
            this.tail = newNode;
        
        else
            newNode.next = this.head;

        this.head = newNode;

    }
    PrintForward()
    {
        for (let current = this.head; current != null; current = current.next)
            console.log(current.value);
    }
}