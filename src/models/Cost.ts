var db = require("../config/db");
import Sequelize from "sequelize"; 
const Project = require("./Project");
const CostType = require("./CostType");

const Cost = db.define(
    'costs',
    {
        amount : {
            type : Sequelize.INTEGER
        },
        project_id : {
            type : Sequelize.INTEGER,
            references: {
                model: Project,  
                key: 'id'
            }
        },
        cost_type_id : {
            type : Sequelize.INTEGER,
            references: {
                model: CostType,  
                key: 'id'
            }
        }
    },{
        timestamps: false
    }
);

Cost.belongsTo(CostType,{
    foreignKey : 'cost_type_id',
    targetKey  : 'id'
})

module.exports = Cost; 