"use strict";
exports.__esModule = true;
var ListNode_1 = require("./ListNode");
var SingleLinkedList = /** @class */ (function () {
    function SingleLinkedList() {
    }
    SingleLinkedList.prototype.SingleLinkedList = function () {
        this.head = this.tail = null;
    };
    SingleLinkedList.prototype.AddToBack = function (val) {
        var newNode = new ListNode_1.ListNode(val);
        if (null == newNode)
            return false;
        if (null == this.head)
            this.head = newNode;
        else
            this.tail.next = newNode;
        this.tail = newNode;
        return true;
    };
    SingleLinkedList.prototype.PrintForward = function () {
        for (var current = this.head; current != null; current = current.next)
            console.log(current.value);
    };
    return SingleLinkedList;
}());
exports.SingleLinkedList = SingleLinkedList;
