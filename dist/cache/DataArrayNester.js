"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataArrayNester = void 0;
const Cache_1 = require("./Cache");
const costTypeHash = Cache_1.CacheSingleton.getCostTypeHash();
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
        console.log(this.idSet, this.dataHash);
    }
    depthFirstSearch(node) {
        //console.log("On node", node); 
        let currentNode = {
            id: node,
            children: []
        };
        if (this.idSet.has(node)) {
            let data = this.dataHash[node];
            currentNode = Object.assign(Object.assign({}, data), { children: [] });
            console.log("Base node", currentNode);
            return currentNode;
        }
        if (this.graphAdjacencyList[node]) {
            let children = [];
            this.graphAdjacencyList[node].forEach((child) => {
                let node = this.depthFirstSearch(child);
                if (node.id !== -1) {
                    children.push(node);
                }
            });
            currentNode.children = children;
        }
        else {
            currentNode.id = -1;
        }
        return currentNode;
    }
    getNesting() {
        const nesting = this.depthFirstSearch(0);
        return nesting;
    }
}
exports.DataArrayNester = DataArrayNester;
