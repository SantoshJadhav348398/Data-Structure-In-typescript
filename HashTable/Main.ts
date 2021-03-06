import { HashTable } from "./HahTable";

let referenceObject ={ 
    returnValue:null
};

let hashTable : HashTable<number, string> = new HashTable<number, string>(5);

hashTable.put(20, "Meghna1");
hashTable.put(11, "Meghna2");
hashTable.put(10, "Meghna3");
hashTable.put(21, "Meghna4");
hashTable.put(100, "Meghna5");
hashTable.put(95, "Meghna6");
hashTable.put(12, "Meghna7");

hashTable.get(10, referenceObject);

console.log(referenceObject.returnValue);
hashTable.get(11, referenceObject);
console.log(referenceObject.returnValue);
hashTable.get(20, referenceObject);
console.log(referenceObject.returnValue);
console.log(" Displaying thje Sequence\n");
hashTable.DisplaySequence();
//hashTable.remove(10);
console.log("Displaying the sequence after removing one element\n");
hashTable.DisplaySequence();

console.log("printing tree");
hashTable.Print();

console.log("deleting tree node meghana 5");
//hashTable.remove(100);

console.log("printing tree");
hashTable.Print();

console.log("deleting tree node meghana 1");
//hashTable.remove(20);

console.log("printing tree4");
hashTable.Print();

console.log("deleting tree node meghana 4");
//hashTable.remove(21);

console.log("printing tree");
hashTable.Print();

console.log("printing the value for 100");
hashTable.get(100, referenceObject);
console.log(referenceObject.returnValue);


console.log("printing the value for 10");
hashTable.get(10, referenceObject);
console.log(referenceObject.returnValue);

 let hashTable1: HashTable<string, number> = new HashTable<string, number>();

 hashTable1.put("pinky1", 10);
 hashTable1.put("pinky2", 20);
 hashTable1.put("pinky3", 30);
 hashTable1.put("pinky4", 40);

 hashTable1.get("pinky2", referenceObject);
 console.log(referenceObject.returnValue);

 hashTable.printInorder();

 let sup: HashTable<number, string> = new HashTable<number, string>();

 console.log("printing balanced binary tree by HashTable");
 sup.put(10, "megha1");
 sup.put(20, "megha2");
 sup.put(30, "megha3");
 sup.put(40, "megha4");
 sup.put(-1, "megha5");
 sup.put(-15, "megha6");
 sup.put(9, "megha7");
// sup.put(14, "megha8");
sup.put(-14, "megha9");
sup.Print();
sup.put(-16, "megha10");
 sup.Print();

//console.log("removing megha7 expected megha5 with megha4 and megha8 as child");
//sup.remove(9);
//sup.Print();
sup.get(-1, referenceObject);

console.log(referenceObject.returnValue);