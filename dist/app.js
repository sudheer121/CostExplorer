"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express
const express_1 = __importDefault(require("express"));
// important typings
const Server_1 = __importDefault(require("./typings/Server"));
// controllers 
const ExplorerController_1 = __importDefault(require("./controllers/ExplorerController"));
// middleware
const express_2 = require("express");
//cache
const Cache_1 = __importDefault(require("./cache/Cache"));
// utils
const db = require("./config/db");
const PORT = parseInt(process.env.PORT);
const app = express_1.default();
const server = new Server_1.default(app, db, PORT);
const controllers = [
    new ExplorerController_1.default(),
];
const globalMiddleware = [
    express_2.urlencoded({ extended: false }),
    express_2.json()
];
Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => Cache_1.default.initCache())
    .then(() => {
    server.loadMiddleware(globalMiddleware);
    server.loadControllers(controllers);
    const httpServer = server.run();
});
