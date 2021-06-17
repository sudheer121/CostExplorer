"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataArrayNester = void 0;
class DataArrayNester {
    constructor(graph, dataArray) {
        this.nesting = {
            id: 0,
            children: []
        };
        this.graphAdjacencyList = graph.getAdjacencyList();
        this.dataHash = {};
        this.idSet = new Set(dataArray.map((el) => el.id));
        dataArray.forEach((el) => {
            this.dataHash[el.id] = el;
        });
    }
    nesterDFS(node) {
        let currentNode = {
            id: node,
            children: []
        };
        if (this.idSet.has(node)) {
            let data = this.dataHash[node];
            currentNode = Object.assign(Object.assign({}, data), { children: [] });
            return currentNode;
        }
        if (this.graphAdjacencyList[node]) {
            let children = [];
            this.graphAdjacencyList[node].forEach((child) => {
                let node = this.nesterDFS(child);
                if (node.id !== -1) {
                    children.push(node);
                }
            });
            currentNode.children = children;
        }
        if (!currentNode.children.length) {
            currentNode.id = -1;
        }
        return currentNode;
    }
    getNesting() {
        const nesting = this.nesterDFS(0);
        return nesting;
    }
}
exports.DataArrayNester = DataArrayNester;
