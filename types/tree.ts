export interface Node {
    key: number;
    parent: Node | null;
    children: Node[];
}
