import { SentinelLinkedList } from "./SentinelLinkedList";

let list : SentinelLinkedList = new SentinelLinkedList();

list.AddToBack(5);
list.AddToBack(6);
list.AddToFront(4);
list.AddToFront(3);
console.log("printing forward\n");
list.printFoward();
console.log("printing Backward\n");
list.printBackward();
list.DeleteNode(4);
console.log("printing Forward\n");
list.printFoward();
console.log("updating Value\n");
list.Update(6, 7);
console.log("printing Forward\n");
list.printFoward();
console.log(`the size of List is : ${list.getSize()}`);


