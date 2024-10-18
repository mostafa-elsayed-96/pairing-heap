import { Node } from "./types/tree";

export class PairingHeap {
    private root: Node | null = null;

    private checkRootExistance(){
        if(!this.root)
            throw new Error('Heap root does not exist');
    }

    private printTreeTraversed(node: Node | null, indent: string = "", leaf: boolean = true) {
        if (node === null) {
            return;
        }
    
        const prefix = indent + (leaf ? "└─ " : "├─ ");
        console.log(prefix + node.key);    
        indent += leaf ? "   " : "│  ";
        for(const child of node.children) {
            this.printTreeTraversed(child, indent, child.children.length == 0);
        }
    }

    insertNum(key: number) {
        if(!this.root) {
            this.root = {
                key,
                parent: null,
                children: []
            }
        }
        else {
            // new inserted node is greater than root
            if(this.root.key < key ) {
                this.root.children.push({
                    key,
                    parent: this.root,
                    children: []
                });
            }
            // new inserted node is less than root
            else {
                const oldRoot = this.root;
                this.root = {
                    key,
                    parent: null,
                    children: [oldRoot]
                }
            }
        }
    }

    mergeHeap(tree: Node) {
        this.checkRootExistance();
        return this.mergeHeaps(tree, this.root as Node);
    }

    mergeHeaps(heap1: Node | null, heap2: Node | null){
        if(!heap1) {
            return heap2;
        }
        if(!heap2) {
            return heap1;
        }
        if(heap1.key >= heap2.key) {
            heap2.children.push(heap1);
            return heap2;
        }
        else {
            heap1.children.push(heap2);
            return heap1;
        }
    }

    decreaseKey(key: number, newKey: number) {
        const rootNode = this.root as Node;
        this.checkRootExistance();
        const node = this.findNodeByKey(rootNode, key);
        if(!node) {
            throw new Error("Couldn't find key to decrease");
        }
        if(rootNode.key == key) {
            rootNode.key = newKey;
            return;
        }
        node.key = newKey;
        if(rootNode.key > newKey) {
            const nodeParent = node.parent as Node;
            nodeParent.children = nodeParent.children.filter((searchNode: Node) => searchNode.key !== node.key);
            this.root = this.mergeHeap(node);
        }
    }

    deleteMin(){
        this.checkRootExistance();
        const rootNode = this.root as Node;
        let newTree = null;
        if(rootNode.children.length > 0){
            for(const child of rootNode.children) {
                newTree = this.mergeHeaps(child, newTree);
            }
            this.root = newTree;
        }
        else {
            this.root = null;
        }
    }

    findMinNode(children: Node[]){
        let minNode: Node | null = null;
        let value = Infinity;
        for (const child of children) {
            if(child.key < value) {
                value = child.key;
                minNode = child;
            }
        }
        return minNode;
    }

    findNodeByKey(node: Node, item: number): Node | null {
        if(node.key === item) {
            return node;
        }
        if(node.children.length == 0){
            return null;
        }

        for(const child of node.children) {
            const nodeFound =  this.findNodeByKey(child, item);
            if(nodeFound)
                return nodeFound;
        }
        return null;
    }

    printHeap(){
        this.printTreeTraversed(this.root);
    }
}