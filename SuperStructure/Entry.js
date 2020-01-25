"use strict";
/**
 * Entry Node has 7 properties
 * It has {key, value} pair
 * NextEntry: points to the next Entry for in case of collision.
 * Next and prev used to point the next and previous Entry to get the Sequence in HashTable.
 * Left and Right used to point left and right subTree in order to get default sorting.
 */
exports.__esModule = true;
var Entry = /** @class */ (function () {
    function Entry(k, val) {
        this.value = val;
        this.nextEntry = null;
        this.key = k;
        this.next = null;
        this.prev = null;
        this.left = null;
        this.right = null;
        this.balance = 0;
    }
    return Entry;
}());
exports.Entry = Entry;
