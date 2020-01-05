"use strict";
exports.__esModule = true;
var Entry_1 = require("./Entry");
var HashTable = /** @class */ (function () {
    function HashTable(size) {
        if (size === void 0) { size = 10; }
        this.size = size;
        this.table = new Array(size);
        this.head = new Entry_1.Entry(null, null);
        this.tail = new Entry_1.Entry(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.root = null;
    }
    HashTable.prototype.Hash = function (k) {
        return k % this.size;
    };
    /**
     * Method put
     */
    HashTable.prototype.put = function (k, val) {
        var offset = this.Hash(k);
        var newEntry = new Entry_1.Entry(k, val);
        // List Implementation by adding new Entry
        newEntry.next = this.tail;
        newEntry.prev = this.tail.prev;
        this.tail.prev.next = newEntry;
        this.tail.prev = newEntry;
        // Tree implementation by adding new Entry
        this.root = this.AddNode(this.root, newEntry);
        if (this.table[offset] != null)
            newEntry.nextEntry = this.table[offset];
        this.table[offset] = newEntry;
    };
    HashTable.prototype.AddNode = function (TreeNode, newEnt, parentNode) {
        if (null == TreeNode)
            return newEnt;
        if (newEnt.key < TreeNode.key) {
            TreeNode.left = this.AddNode(TreeNode.left, newEnt, TreeNode);
            TreeNode.left.parent = TreeNode;
        }
        else {
            TreeNode.right = this.AddNode(TreeNode.right, newEnt, TreeNode);
            TreeNode.right.parent = TreeNode;
        }
        return TreeNode;
    };
    /**
     *    get method
     */
    HashTable.prototype.getEntry = function (k, o) {
        var offset = this.Hash(k);
        for (var current = this.table[offset]; current != null; current = current.nextEntry) {
            if (current.key == k) {
                o.returnValue = current.value;
                return true;
            }
        }
        return false;
    };
    /**
     * remove
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
                return true;
            }
        }
        return false;
    };
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
    HashTable.level = 0;
    return HashTable;
}());
exports.HashTable = HashTable;
