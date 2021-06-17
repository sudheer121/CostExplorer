var db = require("../config/db");
const Sequelize = require("sequelize");
const Client = require("./Client");
const Cost = require("./Cost");

var Project = db.define(
    "projects",
    {   
        title : {
            type :  Sequelize.STRING
        },
        client_id : {
            type : Sequelize.INTEGER,
            references: {
                model: Client,  
                key: 'id'
            }
        },
        type : {
            type : Sequelize.VIRTUAL,
            get () {
                return "project"
            }
        },
        amount : {
            type : Sequelize.VIRTUAL,
            get () {
                return null
            }
        } 
    },{
        timestamps: false
    }
);

Project.hasMany(Cost, {
    as : "children",
    foreignKey : "project_id",
    sourceKey : "id",
    type : {
        type : Sequelize.VIRTUAL,
        get () {
            return "project"
        }
    }
})

module.exports = Project; 