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
const CostType_1 = __importDefault(require("../services/CostType"));
const Graph_1 = __importDefault(require("./Graph"));
class CacheSingleton {
    // private costTypeHash : {
    //     [id : number] : IData
    // }; 
    static setCostTypeGraph(graph) {
        this.graph = graph;
    }
    static getCostTypeGraph() {
        return this.graph;
    }
}
exports.CacheSingleton = CacheSingleton;
class Cache {
    static initCache() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield CostType_1.default.getAll();
            let resultNode = result.map((node) => {
                const IGraphNode = Object.assign({}, node);
                return IGraphNode;
            });
            console.log(resultNode);
            const graph = new Graph_1.default(result.length, resultNode);
            CacheSingleton.setCostTypeGraph(graph);
            return true;
        });
    }
}
exports.default = Cache;
;
