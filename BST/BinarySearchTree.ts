import { TNode } from "./TNode";

export class BinarySearchTree {

    root : TNode;
    static level : number = 0;
    
    constructor() 
    {
        this.root = null;
    }
    
    private addNode(current: TNode, value : number) : TNode
    {
        if (null == current)
            return new TNode(value);

        if (value > current.value)
            current.right = this.addNode(current.right, value);
        
        else
            current.left = this.addNode(current.left, value);
        
        return current;
    }

    DeleteNode(current: TNode, val : number):TNode
    {
        if (current == null)
            return current;
        
        if (val > current.value)
            current.right = this.DeleteNode(current.right, val);
        else if (val < current.value)
            current.left = this.DeleteNode(current.left, val);
        else
        {
            if (current.left == null && current.right == null)
                return null;
            
            else if (null == current.left && null != current.right)
            {
                let child : TNode = current.right;
                return child;
            }

            else if (null == current.right && null != current.left)
            {
                let child : TNode = current.left;
                return child;
            }

            let successor :TNode = current.right;

            while(null != successor.left)
                successor = successor.left;
            
            current.value = successor.value;
            current.right = this.DeleteNode(current.right, successor.value);
        
        }
        return current;
    }

    private inorder(current : TNode) : void
    {
        if (null != current)
        {
            this.inorder(current.left);
            console.log(current.value);
            this.inorder(current.right);
        }
    }

    public add(value : number) : void
    {
        this.root = this.addNode(this.root, value);
    }

    public print():void
    {
        this.PrintPed(this.root);
    }

    public Delete(val : number)
    {
        this.root = this.DeleteNode(this.root, val);
    }

    /**
     * printing In Tree Format
     */
    public PrintPed(current : TNode) 
    {
        if (current)
        {
            let noOfSpace : string = "";
            BinarySearchTree.level += 1;
            this.PrintPed(current.right);
            for (let index = 0; index < BinarySearchTree.level; index++)
                 noOfSpace += "  ";
            //console.log(noOfSpace);
            console.log(`${noOfSpace}${current.value}\n`);
            
            this.PrintPed(current.left); 
            BinarySearchTree.level -= 1;
        }
    }
}