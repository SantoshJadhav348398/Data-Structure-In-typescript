import { ListNode } from "./ListNode";

export class SingleLinkedList
{
    head : ListNode;
    tail : ListNode;
    
    constructor()
    {
        this.head = this.tail = null;
    }

     AddToBack(val:number):boolean
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

        if(null == this.head && null == this.tail)
             this.tail = newNode;
        else
             newNode.next = this.head;

        this.head = newNode;
        return true;
    }
    
   DeleteNode(val : number):boolean
   {
       let previous : ListNode = null;
       
       for (let current = this.head; current != null; previous = current, current = current.next)
       {
           if (current.value == val)
            {    
                previous.next = current.next;
                return true;
            }
       }

       return false;
   }
   
   EditNode(valFrom : number, valTo : number):boolean
   {
       for (let current = this.head; null != current; current = current.next)
       {
           if (current.value == valFrom)
            {    
                current.value = valTo;
                return true;
            }
       }

       return false;
   }

    PrintForward()
    {
        for (let current = this.head; current != null; current = current.next)
            console.log(current.value);
    }
}