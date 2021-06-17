// express
import express, { Application, RequestHandler } from 'express';
// important typings
import Server from './typings/Server';
import Controller from './typings/Controller';
// controllers 
import ExplorerController from './controllers/ExplorerController';
// middleware
import { json, urlencoded } from 'express';
//cache
import Cache from './cache/Cache';
// utils
const db = require("./config/db");


const PORT = parseInt(process.env.PORT!); 
const app: Application = express();
const server: Server = new Server(app, db, PORT);

const controllers: Array<Controller> = [
    new ExplorerController(),
];

const globalMiddleware: Array<RequestHandler> = [
    urlencoded({ extended: false }),
    json() 
];

Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => Cache.initCache())
    .then(() => {
        server.loadMiddleware(globalMiddleware);
        server.loadControllers(controllers);
        const httpServer = server.run();
    });