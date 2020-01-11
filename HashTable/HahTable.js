"use strict";
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
 * ---------------------------------------------------------------------------------------------------------------
 */
exports.__esModule = true;
var Entry_1 = require("./Entry");
var hash = require("js-hash-code");
/**
 *  HashTable stores a table which key as offsets
 *  It contains Entry Object which represents a (key, value) pair,
 *  uses single LinkedList for hashTable collision,
 *  It contains the Sentinel LinkedList to get the Sequence,
 *  It contains Binary SearchTree to get the (default) sorting.
 */
var HashTable = /** @class */ (function () {
    // Initialises the table
    function HashTable(size) {
        if (size === void 0) { size = 10; }
        this.size = size;
        this.table = new Array(size);
        this.head = new Entry_1.Entry(null, null);
        this.tail = new Entry_1.Entry(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.root = null;
        // Allocate the table
        for (var index = 0; index < this.size; index++) {
            this.table[index] = null;
        }
    }
    /**
     * Hash Function
     * @param k
     */
    HashTable.prototype.Hash = function (k) {
        // using js-hash-code of npm to generate hash
        var hashcode = hash(k);
        return (hashcode % this.size);
    };
    /**
     * Method put
     */
    HashTable.prototype.put = function (k, val) {
        // Get offset from hash Function
        var offset = this.Hash(k);
        var newEntry = new Entry_1.Entry(k, val);
        // If collision is occured 
        if (null != this.table[offset])
            // Add the Entry in the Beginning 
            newEntry.nextEntry = this.table[offset];
        // No collision then add to table
        this.table[offset] = newEntry; // head points to new Entry
        // List Implementation by adding new Entry
        newEntry.next = this.tail;
        newEntry.prev = this.tail.prev;
        this.tail.prev.next = newEntry;
        this.tail.prev = newEntry;
        // Tree implementation by adding new Entry
        this.root = this.AddNode(this.root, newEntry);
        return true;
    };
    /**
     * AddNode function used to provide the sorting
     * Implementation is done in tree
     * it returns the Entry
     * @param TreeNode
     * @param newEnt
     * @param parentNode
     */
    HashTable.prototype.AddNode = function (TreeNode, newEnt, parentNode) {
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
    };
    /**
     *    get method
     *    It contains 2 parameters,
     *    key and Object Reference,
     *    Since there is no call by reference in javaScript/typeScript,
     *    Using Object Reference to provide value for particular key,
     *    It returns Boolean Value
     */
    HashTable.prototype.get = function (k, o) {
        var offset = this.Hash(k);
        // Checking if key exists in table
        for (var current = this.table[offset]; current != null; current = current.nextEntry) {
            // If key matches with current key
            if (current.key == k) {
                o.returnValue = current.value; // property of Object reference is set 
                return true;
            }
        }
        /**
         * If key not found Property of Object may contains previous value,
         * Thus, Set to null
         */
        o.returnValue = null;
        return false;
    };
    /**
     * Remove Function with 1 parameter
     * It returns Boolean value
     * Remove the entry from HashTable.
     */
    HashTable.prototype.remove = function (k) {
        var offset = this.Hash(k);
        var prev = null;
        for (var current = this.table[offset]; current != null; prev = current, current = current.nextEntry) {
            if (current.key == k) {
                // Removing Entry from HashTable
                if (current == this.table[offset])
                    this.table[offset] = current.nextEntry;
                else {
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
    };
    /**
     * DeleteNode function is used to remove Entry from Tree
     * It returns the Entry
     * @param current
     * @param k
     */
    HashTable.prototype.DeleteNode = function (current, k) {
        // If Entry does not exist
        if (null == current)
            return current;
        // If key is smaller than current key traverse to left subtree
        if (current.key > k)
            current.left = this.DeleteNode(current.left, k);
        // Else traverse to right subtree 
        else if (current.key < k)
            current.right = this.DeleteNode(current.right, k);
        else {
            // current Entry contains no child
            if (null == current.left && null == current.right)
                return null;
            // current Entry contains right child
            if (null == current.left && null != current.right) {
                var child = current.right;
                return child;
            }
            // current Entry contains left child
            if (null != current.left && null == current.right) {
                var child = current.left;
                return child;
            }
            // Current Entry contains both child
            // Add current's left subtree to right subtree,
            // Return current's right subtree 
            current.right = this.AddNode(current.right, current.left);
            return current.right;
        }
        return current;
    };
    /**
     * Method DisplaySequence is used to display the sequence,
     */
    HashTable.prototype.DisplaySequence = function () {
        var List = "";
        for (var current = this.head.next; current != this.tail; current = current.next) {
            List += (current.value).toString();
            if (current.next != this.tail)
                List += " -> ";
        }
        console.log(List, "\n");
    };
    /**
     *   printing tree  */
    HashTable.prototype.Print = function () {
        this.PrintPed(this.root);
    };
    HashTable.prototype.PrintPed = function (current) {
        if (current) {
            var noOfSpace = "";
            HashTable.level += 1;
            this.PrintPed(current.right);
            for (var index = 0; index < HashTable.level; index++)
                noOfSpace += "  ";
            //console.log(noOfSpace);
            console.log("" + noOfSpace + current.value + "\n");
            this.PrintPed(current.left);
            HashTable.level -= 1;
        }
    };
    HashTable.prototype.printInorder = function () {
        this.inorder(this.root);
    };
    HashTable.prototype.inorder = function (current) {
        if (null != current) {
            this.inorder(current.left);
            console.log(current.value);
            this.inorder(current.right);
        }
    };
    HashTable.level = 0;
    return HashTable;
}());
exports.HashTable = HashTable;
