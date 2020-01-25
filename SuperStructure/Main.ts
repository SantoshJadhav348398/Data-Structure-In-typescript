import { SuperStructure } from "./SuperStructure";

let referenceObject ={ 
    returnValue:null
};

let hashTable : SuperStructure<number, string> = new SuperStructure<number, string>(5);

hashTable.put(20, "C");
hashTable.put(11, "Java");
hashTable.put(10, "C++");
hashTable.put(30, "Python");
hashTable.put(25, "Pascal");
hashTable.put(28, "Fortron");
hashTable.put(100, "JavaScript");
hashTable.put(95, "C#");
hashTable.put(12, "TypeScript");

hashTable.get(10, referenceObject);

console.log(`get value for key 10 : ${referenceObject.returnValue}`);
hashTable.get(11, referenceObject);
console.log(`get value for key 11 : ${referenceObject.returnValue}`);
hashTable.get(20, referenceObject);
console.log(`get value for key 20 : ${referenceObject.returnValue}`);
console.log("\n Displaying thje Sequence\n");
hashTable.DisplaySequence();
console.log("\nDisplaying the Entries in sorted order of their keys\n");
hashTable.printInorder();
console.log("\n Displaying Entries in tree format\n");
hashTable.Print();
hashTable.remove(20);
console.log("Displaying the sequence after removing java\n");
hashTable.DisplaySequence();

console.log("printing tree after removing the C");
hashTable.Print();

console.log("printing in inorder after removing C")
 hashTable.printInorder();


 //hashTable.remove(25);
console.log("Displaying the sequence after removing java\n");
hashTable.DisplaySequence();

console.log("printing tree after removing the C");
hashTable.Print();

console.log("printing in inorder after removing C")
 hashTable.printInorder();

hashTable.get(28, referenceObject);
console.log(`get value for key 28 : ${referenceObject.returnValue}`);

let sup: SuperStructure<number, string> = new SuperStructure<number, string>();

sup.put(30, "C++");
sup.put(40, "Java");
sup.put(35, "C#");
sup.put(20,"python");
sup.put(25, "pascal");
sup.put(37, "js");
sup.put(42, "ts");

//sup.remove(25);
//sup.remove(42);
sup.Print();