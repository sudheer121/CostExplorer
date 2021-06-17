var db = require("../config/db");
import Sequelize from "sequelize"; 
const Cost = require("./Cost"); 

const CostType = db.define(
    "cost_types",
    {   
        type : {
            type : Sequelize.VIRTUAL,
            get () {
                return "cost"
            }
        },
        name : {
            type :  Sequelize.INTEGER
        },
        parent_id  : {
            type : Sequelize.INTEGER,
        },
    },{
        timestamps: false
    }
);

CostType.belongsTo(CostType,{
    foreignKey : 'parent_id',
    targetKey : 'id',
})

CostType.hasOne(CostType,{
    foreignKey : 'parent_id',
    sourceKey : 'id'
})

module.exports = CostType; 