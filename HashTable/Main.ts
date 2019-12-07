import { HashTable } from "./HahTable";

let referenceObject ={ 
    returnValue:null
};

let hashTable : HashTable<string> = new HashTable<string>(5);

hashTable.put(20, "Meghna");
hashTable.put(11, "Sandesh");
hashTable.put(10, "Sandeep");

let data = hashTable.getEntry(10, referenceObject);

console.log(referenceObject.returnValue);
hashTable.getEntry(11, referenceObject);
console.log(referenceObject.returnValue);
hashTable.getEntry(20, referenceObject);
console.log(referenceObject.returnValue);
console.log(" Displaying thje Sequence\n");
hashTable.DisplaySequence();
hashTable.remove(10);
console.log("Displaying the sequence after removing sandeep\n");
hashTable.DisplaySequence();