"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../config/db");
const sequelize_1 = __importDefault(require("sequelize"));
const Project = require("./Project");
const CostType = require("./CostType");
const Cost = db.define('costs', {
    amount: {
        type: sequelize_1.default.INTEGER
    },
    project_id: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: Project,
            key: 'id'
        }
    },
    cost_type_id: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: CostType,
            key: 'id'
        }
    }
}, {
    timestamps: false
});
Cost.belongsTo(CostType, {
    foreignKey: 'cost_type_id',
    targetKey: 'id'
});
module.exports = Cost;
