"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheSingleton = void 0;
const CostType_1 = __importDefault(require("../dao/CostType"));
const Graph_1 = __importDefault(require("../helpers/Graph"));
class Cache {
    static initCache() {
        return __awaiter(this, void 0, void 0, function* () {
            let resultArray = yield CostType_1.default.getAll();
            let resultNodeArray = resultArray.map((node) => {
                if (node.parent_id == null) {
                    node.parent_id = 0;
                }
                const graphNode = Object.assign({}, node);
                return graphNode;
            });
            console.log(resultNodeArray);
            const graph = new Graph_1.default(resultNodeArray.length, resultNodeArray);
            CacheSingleton.setCostTypeHash(resultArray);
            CacheSingleton.setCostTypeGraph(graph);
            return true;
        });
    }
}
exports.default = Cache;
;
class CacheSingleton {
    static setCostTypeGraph(graph) {
        this.costTypeGraph = graph;
    }
    static getCostTypeGraph() {
        return this.costTypeGraph;
    }
    static setCostTypeHash(data) {
        this.costTypeHash = {};
        for (let i = 0; i < data.length; i++) {
            this.costTypeHash[data[i].id] = data[i];
        }
    }
    static getCostTypeHash() {
        return this.costTypeHash;
    }
}
exports.CacheSingleton = CacheSingleton;
