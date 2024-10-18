import { PairingHeap } from "./pair-heap"

const main = () => {
    const heapInstance = new PairingHeap();
    heapInstance.insertNum(5);
    heapInstance.insertNum(2);
    heapInstance.insertNum(8);
    heapInstance.insertNum(1);
    heapInstance.insertNum(7);
    console.log("After inserting 7");
    heapInstance.printHeap()
    heapInstance.deleteMin();
    heapInstance.insertNum(6);
    heapInstance.insertNum(3);
    console.log("After inserting 3");
    heapInstance.printHeap()
    heapInstance.decreaseKey(8,1);
    heapInstance.deleteMin();
    heapInstance.insertNum(4);
    heapInstance.insertNum(9);
    console.log("After inserting 9");
    heapInstance.printHeap()
}

main();