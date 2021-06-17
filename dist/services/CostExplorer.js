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
const models = require("../models");
const Cache_1 = require("../cache/Cache");
const DataArrayNester_1 = require("../helpers/DataArrayNester");
const ExplorerItem_1 = __importDefault(require("../helpers/ExplorerItem"));
const CostExplorerQueryBuilder_1 = __importDefault(require("./CostExplorerQueryBuilder"));
const Client_1 = __importDefault(require("../dao/Client"));
class CostExplorer {
    constructor() {
        this.clientIdArray = [],
            this.projectIdArray = [],
            this.costTypeIdArray = [];
    }
    setClientArray(data) {
        this.clientIdArray = data;
    }
    setProjectArray(data) {
        this.projectIdArray = data;
    }
    setCostTypeArray(data) {
        this.costTypeIdArray = data;
    }
    getExplorerResult() {
        return __awaiter(this, void 0, void 0, function* () {
            let queryobj = new CostExplorerQueryBuilder_1.default(this.clientIdArray, this.projectIdArray, this.costTypeIdArray);
            let query = queryobj.getQuery();
            let result = yield Client_1.default.getAllByQuery(query);
            result = result.map((node) => node.get({ plain: true }));
            result = result.map((client) => {
                client.children = client.children.map((project) => {
                    let nesterobj = new DataArrayNester_1.DataArrayNester(Cache_1.CacheSingleton.getCostTypeGraph(), project.children);
                    project.children = nesterobj.getNesting().children;
                    return project;
                });
                return client;
            });
            result = result.map((client) => {
                let explorerObject = new ExplorerItem_1.default(client);
                return explorerObject.getNesting();
            });
            return result;
        });
    }
}
exports.default = CostExplorer;
