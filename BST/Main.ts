import { BinarySearchTree } from "./BinarySearchTree";

let ped : BinarySearchTree = new BinarySearchTree();

ped.add(5);
ped.add(7);
ped.add(4);
ped.add(6);
ped.add(3);
console.log("printing values", "\n");
//ped.print();
ped.Delete(3);
ped.Delete(7);
ped.print();