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

console.log ("length of list is %d", list.GetLength());

let list2 : SingleLinkedList = new SingleLinkedList();

list2.AddToBack(100);
list2.AddToBack(101);
list2.AddToBack(102);

list2.PrintForward();

list.Merge(list2);
console.log("after merge");
list.PrintForward();

list.AddToFront(10);
list.PrintForward();
