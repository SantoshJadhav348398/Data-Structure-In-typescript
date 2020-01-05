"use strict";
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
        this.parent = null;
    }
    return Entry;
}());
exports.Entry = Entry;
