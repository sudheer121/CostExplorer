"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = require("../cache/Cache");
class ExplorerItem {
    constructor(nestedData) {
        this.nestedData = nestedData;
    }
    dataNester(nestedData) {
        let node = nestedData;
        if (!node.type) {
            node.type = 'cost';
            node.name = Cache_1.CacheSingleton.getCostTypeHash()[node.id].name;
        }
        node.amount = (node.amount) ? parseFloat(node.amount) : 0;
        if (node.children) {
            node.children = node.children.map((child) => {
                let childNode = this.dataNester(child);
                node.amount = node.amount + childNode.amount;
                return childNode;
            });
        }
        return node;
    }
    getNesting() {
        return this.dataNester(this.nestedData);
    }
}
exports.default = ExplorerItem;
