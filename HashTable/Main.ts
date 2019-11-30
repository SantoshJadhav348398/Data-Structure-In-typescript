import { HashTable } from "./HahTable";

let hashTable : HashTable<string> = new HashTable<string>(5);

hashTable.put(20, "Meghna");
hashTable.put(11, "Sandesh");
hashTable.put(10, "Sandeep");
let data = hashTable.getEntry(10);

console.log(data);
console.log(hashTable.getEntry(11));
console.log(hashTable.getEntry(20));