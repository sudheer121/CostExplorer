"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Graph {
    constructor(totalNodes, dataArray) {
        this.leaves = [];
        this.adjacencyList = new Array(totalNodes);
        dataArray.forEach((node) => {
            let parent_id = node.parent_id ? node.parent_id : 0;
            let node_id = node.id ? node.id : 0;
            if (!this.adjacencyList[parent_id]) {
                this.adjacencyList[parent_id] = [];
            }
            this.adjacencyList[parent_id].push(node_id);
        });
        console.log(this.adjacencyList);
        for (let i = 0; i <= this.adjacencyList.length; i++) {
            let el = this.adjacencyList[i];
            if (!el || !el.length) {
                this.leaves.push(i);
            }
        }
    }
    ;
    getAdjacencyList() {
        return this.adjacencyList;
    }
    getLeaves() {
        return this.leaves;
    }
}
exports.default = Graph;
