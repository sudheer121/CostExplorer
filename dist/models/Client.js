"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../config/db");
const sequelize_1 = __importDefault(require("sequelize"));
const Project = require("./Project");
var Client = db.define("client", {
    name: {
        type: sequelize_1.default.STRING
    },
    type: {
        type: sequelize_1.default.VIRTUAL,
        get() {
            return "client";
        }
    },
    amount: {
        type: sequelize_1.default.VIRTUAL,
        get() {
            return null;
        }
    }
}, {
    timestamps: false
});
Client.hasMany(Project, {
    as: 'children',
    sourceKey: 'id',
    foreignKey: 'client_id'
});
module.exports = Client;
