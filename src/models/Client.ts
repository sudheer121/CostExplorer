var db = require("../config/db");
import Sequelize from "sequelize"; 
const Project : any = require("./Project");

export interface ClietAttributes  {
    name : string,
    type : 'client',
    amount : number 
}

var Client = db.define(
    "client",
    {   
        name : {
            type :  Sequelize.STRING
        },
        type : {
            type : Sequelize.VIRTUAL,
            get () {
                return "client"
            }
        },
        amount : {
            type : Sequelize.VIRTUAL,
            get() {
                return null; 
            }
        }
    },{
        timestamps: false
    }
);

Client.hasMany(Project,{
    as : 'children',
    sourceKey  : 'id',
    foreignKey : 'client_id'
})

module.exports = Client; 