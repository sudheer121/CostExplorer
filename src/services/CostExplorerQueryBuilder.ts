const models = require("../models"); 
interface queryObject {
    id : number 
}

export default class CostExplorerQueryBuilder {
    private clientQueryObject : queryObject | {};
    private projectQueryObject : queryObject | {};
    private query : any; 

    constructor(client_id_array : Array<number>,  project_id_array : Array<number>, cost_type_id_array : Array<number>,){
        this.clientQueryObject = (client_id_array.length) ? {
            id : client_id_array
        } : {}; 
        this.projectQueryObject = (project_id_array.length) ? {
            id : project_id_array
        } : {}; 

        this.query = {
            where :  this.clientQueryObject,
            attributes : ['id','amount','name','type'], 
            include : [{
                model : models.Project,
                as : 'children', 
                attributes : ['id','amount',['title','name'],'type'], 
                where : this.projectQueryObject,
                include : [{
                    attributes : ['amount', ['cost_type_id','id']],
                    model : models.Cost,
                    as : "children",  
                    where :  {
                        'cost_type_id' :  cost_type_id_array
                    }
                }],

            }],
            order : [
                ['id', 'ASC'], 
                [ { model : models.Project, as : "children" }, 'id', 'ASC'] 
            ],
        }
    }

    public getQuery() : any {
        return this.query; 
    }
}