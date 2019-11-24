export class TNode {

    value : number;
    left : TNode;
    right : TNode;
    constructor(val : number) 
    {
        this.value = val;
        this.left = null;
        this.right = null;
    }
}