/*---------------------------------------------------------------------------------------
 * Project:  SuperStructure
 * File:     SuperStructure.ts
 * Author:   Santosh Jadhav
 * 
 * Description: 
 *      Implementation of Generic SuperStructure in TypeScript
 *      
 *      This is implemented using combination of HashTable, Sentinel LinkedList, and Binary SearchTree
 *      This implementation uses separate chaining using Single linkedList
 *      
 * Note: 
 *      Before running this file you must install js-hash-code on your local (npm install js-hash-code)
 *      
 * ---------------------------------------------------------------------------------------------------------------
 */


import { Entry } from "./Entry";
import hash = require("js-hash-code");

/**
 *  HashTable stores a table which key as offsets
 *  It contains Entry Object which represents a (key, value) pair,
 *  uses single LinkedList for hashTable collision,
 *  It contains the Sentinel LinkedList to get the Sequence,
 *  It contains Binary SearchTree to get the (default) sorting.   
 */
export class SuperStructure<K,V> {
    
    /**
     * Contains the table, (head and tail) , root and level and also size
     */
    private table;
    private head;
    private tail;
    private root:Entry<K, V>;
    public static level = 0;
    
    // Initialises the table
    constructor(private size = 10) {
        this.table = new Array<Entry<K, V>>(size);
        this.head = new Entry<K,V>(null, null);
        this.tail = new Entry<K, V>(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.root = null;

        // Allocate the table
        for (let index = 0; index < this.size; index++) {
            this.table[index] = null;
            
        }
    }
    
    /**
     * Hash Function
     * @param k 
     */
    private Hash (k : K){

        // using js-hash-code of npm to generate hash
        var hashcode = hash(k);
        return (hashcode % this.size);
    }

    /**
     * Method put
     */
    public put(k:K, val : V): boolean {
       
        // Get offset from hash Function
        let offset : number = this.Hash(k);
        
        let newEntry:Entry<K, V> = new Entry<K, V>(k, val);        

        // If collision is occured 
        if (null != this.table[offset])
            // Add the Entry in the Beginning 
            newEntry.nextEntry = this.table[offset]

        // No collision then add to table
        this.table[offset] = newEntry;  // head points to new Entry
       
       
       // List Implementation by adding new Entry
       newEntry.next = this.tail;
       newEntry.prev = this.tail.prev;
       this.tail.prev.next = newEntry;
       this.tail.prev = newEntry;
       
        // Tree implementation by adding new Entry
        this.root = this.AddNode(this.root, newEntry);

        return true;
    }

    /**
     * AddNode function used to provide the sorting 
     * Implementation is done in tree
     * it returns the Entry
     * @param TreeNode 
     * @param newEnt 
     * @param parentNode 
     */
    private AddNode(TreeNode: Entry<K, V>, newEnt: Entry<K, V>, parentNode?: Entry<K, V>) : Entry<K, V>
    {
        // If there is no Entry return newEntry   
        if (null == TreeNode) 
            return newEnt;


        // If key of new Entry is smaller than TreeNode key than traverse left
        if (newEnt.key < TreeNode.key) { 
            TreeNode.left = this.AddNode(TreeNode.left, newEnt, TreeNode);
            
        }

        // Else Traverse Right
        else {
            TreeNode.right = this.AddNode(TreeNode.right, newEnt, TreeNode);
            
        }
        return TreeNode;
    }

    /**
     *    get method
     *    It contains 2 parameters,
     *    key and Object Reference,
     *    Since there is no call by reference in javaScript/typeScript,  
     *    Using Object Reference to provide value for particular key,
     *    It returns Boolean Value
     */
    public get(k : K, o: {returnValue}) : boolean {
        let offset = this.Hash(k);

        // Checking if key exists in table
        for (let current : Entry<K, V> = this.table[offset]; current != null; current = current.nextEntry){
            // If key matches with current key
            if (current.key == k){
                o.returnValue = current.value; // property of Object reference is set 
                return true;
            }

        }
        /**
         * If key not found Property of Object may contains previous value,
         * Thus, Set to null
         */
        o.returnValue=null;
        return false;
       }

    /**
     * Remove Function with 1 parameter
     * It returns Boolean value
     * Remove the entry from HashTable. 
     */
    public remove(k : K) : boolean{
        let offset = this.Hash(k);
        let prev : Entry<K, V> = null;
        for (let current : Entry<K, V> = this.table[offset]; current != null; prev = current, current = current.nextEntry)
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

    /**
     * DeleteNode function is used to remove Entry from Tree
     * It returns the Entry
     * @param current 
     * @param k 
     */
    private DeleteNode(current:Entry<K, V>, k:K) : Entry<K, V>
    {
        // If Entry does not exist
        if (null == current)
            return current;
        
        // If key is smaller than current key traverse to left subtree
        if (current.key > k)
            current.left = this.DeleteNode(current.left, k);
        
        // Else traverse to right subtree 
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
            // Add current's left subtree to right subtree,
            // Return current's right subtree 
            current.right = this.AddNode(current.right, current.left);

           return current.right;
        }
        return current;
        
    }

    /**
     * Method DisplaySequence is used to display the sequence,
     */
    public DisplaySequence(): void
    {
        // list is used to append the value,
        let List : string = "";
        
        for (let current : Entry<K, V> = this.head.next; current != this.tail; current = current.next)
        {   
            // Values are appended to list to give feel of list
            List += (current.value).toString();
            if (current.next != this.tail)
                List += " -> ";
        }
        console.log(List, "\n");
    }

    /**
     *   printing all Entries in tree  */
    public Print() {
        this.PrintPed(this.root);
    }

    private PrintPed(current : Entry<K, V>) 
    {
        if (current)
        {
            let noOfSpace : string = "";
            SuperStructure.level += 1;
            this.PrintPed(current.right);
            for (let index = 0; index < SuperStructure.level; index++)
                 noOfSpace += "  ";
            //console.log(noOfSpace);
            console.log(`${noOfSpace}${current.value}\n`);
            
            this.PrintPed(current.left); 
            SuperStructure.level -= 1;
        }
    }

    // Printing the Inorder 
    public printInorder()
    {
        this.inorder(this.root);
    }

    private inorder(current : Entry<K, V>) : void
    {
        if (null != current)
        {
            this.inorder(current.left);
            console.log(current.value);
            this.inorder(current.right);
        }
    }

}