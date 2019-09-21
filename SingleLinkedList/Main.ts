import { SingleLinkedList } from "./SingleLinkedList";

let list = new SingleLinkedList();

list.AddToBack(5);
list.AddToBack(10);
list.AddToFront(20);
list.PrintForward();
console.log("1st PrintForward");

list.AddToFront(15);
list.AddToFront(1);
console.log("2nd printForward");
list.PrintForward();

list.DeleteNode(20);
list.PrintForward();
console.log("print after delete");

list.EditNode(1, 30);
list.PrintForward();
console.log("print after edit");
