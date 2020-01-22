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
 * Note:
 *      Before running this file you must install js-hash-code on your local (npm install js-hash-code)
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
var SuperStructure = /** @class */ (function () {
    // Initialises the table
    function SuperStructure(size) {
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
    SuperStructure.prototype.Hash = function (k) {
        // using js-hash-code of npm to generate hash
        var hashcode = hash(k);
        return (hashcode % this.size);
    };
    /**
     * Method put
     */
    SuperStructure.prototype.put = function (k, val) {
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
    SuperStructure.prototype.AddNode = function (TreeNode, newEnt, parentNode) {
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
     *    Using Object Reference to store the value for particular key,
     *    It returns Boolean
     */
    SuperStructure.prototype.get = function (k, o) {
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
    SuperStructure.prototype.remove = function (k) {
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
    SuperStructure.prototype.DeleteNode = function (current, k) {
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
            // Finding the successor to replace the current Entry
            var successor = current.right;
            while (null != successor.left)
                successor = successor.left;
            // Storing the successor in tempEntry
            // Since the successor may contain right child
            // Before replacing current with successor it is required to store it's right child   
            var tempNode = successor;
            current.right = this.DeleteNode(current.right, tempNode.key);
            // link current's left and right child to successor and return
            successor.left = current.left;
            successor.right = current.right;
            return successor;
        }
        return current;
    };
    /**
     * Method DisplaySequence is used to display the sequence,
     */
    SuperStructure.prototype.DisplaySequence = function () {
        // list is used to append the value,
        var List = "";
        for (var current = this.head.next; current != this.tail; current = current.next) {
            // Values are appended to list to give feel of list
            List += (current.value).toString();
            if (current.next != this.tail)
                List += " -> ";
        }
        console.log(List, "\n");
    };
    /**
     *   printing all Entries in tree  */
    SuperStructure.prototype.Print = function () {
        this.PrintPed(this.root);
    };
    SuperStructure.prototype.PrintPed = function (current) {
        if (current) {
            var noOfSpace = "";
            SuperStructure.level += 1;
            this.PrintPed(current.right);
            for (var index = 0; index < SuperStructure.level; index++)
                noOfSpace += "  ";
            //console.log(noOfSpace);
            console.log("" + noOfSpace + current.value + "\n");
            this.PrintPed(current.left);
            SuperStructure.level -= 1;
        }
    };
    // Printing the Inorder 
    SuperStructure.prototype.printInorder = function () {
        this.inorder(this.root);
    };
    SuperStructure.prototype.inorder = function (current) {
        if (null != current) {
            this.inorder(current.left);
            console.log(current.value);
            this.inorder(current.right);
        }
    };
    SuperStructure.level = 0;
    return SuperStructure;
}());
exports.SuperStructure = SuperStructure;
