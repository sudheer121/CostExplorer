const models = require("../models"); 

export interface ICostType {
    id : number,
    name : string,
    parent_id : number 
}

export default class CostType {
    public static async getAll () : Promise<Array<ICostType>> {
        const result = await models.CostType.findAll({
            attributes : ['id','name','parent_id'],
            raw : true
        })
        return result; 
    }    
}