"use strict";
exports.__esModule = true;
var HahTable_1 = require("./HahTable");
var referenceObject = {
    returnValue: null
};
var hashTable = new HahTable_1.HashTable(5);
hashTable.put(20, "Meghna1");
hashTable.put(11, "Meghna2");
hashTable.put(10, "Meghna3");
hashTable.put(21, "Meghna4");
hashTable.put(100, "Meghna5");
hashTable.put(95, "Meghna6");
hashTable.put(12, "Meghna7");
hashTable.getEntry(10, referenceObject);
console.log(referenceObject.returnValue);
hashTable.getEntry(11, referenceObject);
console.log(referenceObject.returnValue);
hashTable.getEntry(20, referenceObject);
console.log(referenceObject.returnValue);
console.log(" Displaying thje Sequence\n");
hashTable.DisplaySequence();
hashTable.remove(10);
console.log("Displaying the sequence after removing one element\n");
hashTable.DisplaySequence();
console.log("printing tree");
hashTable.Print();
