"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../config/db");
const sequelize_1 = __importDefault(require("sequelize"));
const Cost = require("./Cost");
const CostType = db.define("cost_types", {
    type: {
        type: sequelize_1.default.VIRTUAL,
        get() {
            return "cost";
        }
    },
    name: {
        type: sequelize_1.default.INTEGER
    },
    parent_id: {
        type: sequelize_1.default.INTEGER,
    },
}, {
    timestamps: false
});
CostType.belongsTo(CostType, {
    foreignKey: 'parent_id',
    targetKey: 'id',
});
CostType.hasOne(CostType, {
    foreignKey: 'parent_id',
    sourceKey: 'id'
});
module.exports = CostType;
