import { HashTable } from "./HahTable";

let hashTable : HashTable = new HashTable(5);

hashTable.put(20, 15);
hashTable.put(11, 20);
hashTable.put(10, 25);
let data = hashTable.getEntry(10);

console.log(data);
console.log(hashTable.getEntry(11));
console.log(hashTable.getEntry(20));