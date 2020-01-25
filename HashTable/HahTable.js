"use strict";
/*---------------------------------------------------------------------------------------
 * Project:  SuperStructure
 * File:     SuperStructure.ts
 * Author:   Santosh Jadhav
 *
 * Description:
 *      Implementation of Generic SuperStructure in TypeScript
 *
 *      This is implemented using combination of HashTable, Sentinel LinkedList, Binary SearchTree and AVL
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
        this.root = this.AddNode(this.root, newEntry, { heightChangedOnInsert: false });
        return true;
    };
    /**
     * AddNode function used to provide the sorting
     * Implementation is done in tree
     * it returns the Entry
     *
     * @param TreeNode
     * @param newEnt is new Entry created for hashtable
     * @param Height is a object contains boolean property heightChangedOnInsert
     *
     * heightChangedOnInsert property is used to check  height in order to perform Balanced Binary Tree
     * Since in typeSscript don't have pass by reference we are passing Object as reference.
     */
    HashTable.prototype.AddNode = function (TreeNode, newEnt, Height) {
        // If there is no Entry return newEntry
        // With newEntry heightChangedOnInsert set to true   
        if (null == TreeNode) {
            Height.heightChangedOnInsert = true;
            return newEnt;
        }
        // If key of new Entry is smaller than TreeNode key than traverse left
        if (newEnt.key < TreeNode.key) {
            TreeNode.left = this.AddNode(TreeNode.left, newEnt, Height);
            // If there is a height change in left subtree decrement balance by 1
            if (Height.heightChangedOnInsert) {
                TreeNode.balance -= 1;
            }
        }
        // Else Traverse Right
        else {
            TreeNode.right = this.AddNode(TreeNode.right, newEnt, Height);
            // If there is height change in right subtree increment balance by 1
            if (Height.heightChangedOnInsert) {
                TreeNode.balance += 1;
            }
        }
        // Check if tree is unbalance or not.
        if (TreeNode.balance == -2 || TreeNode.balance == 2) {
            TreeNode = this.Rebalance(TreeNode);
            // After tree is Balanced set heightChangeOnInsert
            Height.heightChangedOnInsert = false;
        }
        return TreeNode;
    };
    /**
     * Rebalance method :
     * @param TreeNode
     * returns an Entry<K, V>
     *
     * It used for rebalancing of tree
     */
    HashTable.prototype.Rebalance = function (TreeNode) {
        if (TreeNode.balance == 2) {
            if (TreeNode.right.balance == 1)
                TreeNode = this.RotateLeft(TreeNode);
            else
                TreeNode = this.RotateRightLeft(TreeNode);
        }
        else {
            if (TreeNode.left.balance == -1)
                TreeNode = this.RotateRight(TreeNode);
            else
                TreeNode = this.RotateLeftRight(TreeNode);
        }
        return TreeNode;
    };
    HashTable.prototype.RotateLeft = function (TreeNode) {
        var child = TreeNode.right;
        TreeNode.right = child.left;
        child.left = TreeNode;
        TreeNode.balance = child.balance = 0;
        return child;
    };
    HashTable.prototype.RotateRight = function (TreeNode) {
        var child = TreeNode.left;
        TreeNode.left = child.right;
        child.right = TreeNode;
        TreeNode.balance = child.balance = 0;
        return child;
    };
    HashTable.prototype.RotateRightLeft = function (TreeNode) {
        var child = TreeNode.right;
        var gChild = child.left;
        child.left = gChild.right;
        gChild.right = child;
        TreeNode.right = gChild.left;
        gChild.left = TreeNode;
        TreeNode.balance = gChild.balance = child.balance = 0;
        return gChild;
    };
    HashTable.prototype.RotateLeftRight = function (TreeNode) {
        var child = TreeNode.left;
        var gChild = child.right;
        child.right = gChild.left;
        gChild.left = child;
        TreeNode.left = gChild.right;
        gChild.right = TreeNode;
        child.balance = gChild.balance = TreeNode.balance = 0;
        return gChild;
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
                this.root = this.DeleteNode(this.root, k, { heightChangedOnDelete: false });
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
     * @param Depth is a Object which is used to achieve Pass by reference
     * Object Depth with Boolean property heightChangedOnDelete is used for rebalancing the tree
     */
    HashTable.prototype.DeleteNode = function (current, k, Depth) {
        // If Entry does not exist
        if (null == current)
            return current;
        // If key is smaller than current key traverse to left subtree
        if (current.key > k) {
            current.left = this.DeleteNode(current.left, k, Depth);
            if (Depth.heightChangedOnDelete == true)
                current.balance += 1;
        }
        // Else traverse to right subtree 
        else if (current.key < k) {
            current.right = this.DeleteNode(current.right, k, Depth);
            if (Depth.heightChangedOnDelete == true) {
                current.balance -= 1;
            }
        }
        else {
            // current Entry contains no child
            if (null == current.left && null == current.right) {
                Depth.heightChangedOnDelete = true;
                return null;
            }
            // current Entry contains right child
            if (null == current.left && null != current.right) {
                var child = current.right;
                Depth.heightChangedOnDelete = true;
                return child;
            }
            // current Entry contains left child
            if (null != current.left && null == current.right) {
                var child = current.left;
                Depth.heightChangedOnDelete = true;
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
            current.right = this.DeleteNode(current.right, tempNode.key, Depth);
            // link current's left and right child to successor
            successor.left = current.left;
            successor.right = current.right;
            Depth.heightChangedOnDelete = true;
            return successor;
        }
        if (current.balance == 2 || current.balance == -2) {
            current = this.Rebalance(current);
            Depth.heightChangedOnDelete = false;
        }
        return current;
    };
    /**
     * Method DisplaySequence is used to display the sequence,
     */
    HashTable.prototype.DisplaySequence = function () {
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
    // Printing the Inorder 
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
