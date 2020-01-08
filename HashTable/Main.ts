import { HashTable } from "./HahTable";

let referenceObject ={ 
    returnValue:null
};

let hashTable : HashTable<string> = new HashTable<string>(5);

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

console.log("deleting tree node meghana 5");
hashTable.remove(100);

console.log("printing tree");
hashTable.Print();

console.log("deleting tree node meghana 1");
hashTable.remove(20);

console.log("printing tree4");
hashTable.Print();

console.log("deleting tree node meghana 4");
hashTable.remove(21);

console.log("printing tree");
hashTable.Print();