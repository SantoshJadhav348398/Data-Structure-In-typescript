export class ListNode
{
    value : number;
    next : ListNode;
    prev : ListNode;

    constructor(val : number)
    {
        this.value = val;
        this.next = null;
        this.prev = null;
    }

}