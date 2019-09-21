import { SingleLinkedList } from "./SingleLinkedList";

let list = new SingleLinkedList();

list.AddToBack(5);
list.AddToBack(10);
list.AddToFront(20);
list.PrintForward();

list.AddToFront(5);
list.AddToFront(1);

list.PrintForward();

