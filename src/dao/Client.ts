import { IExplorerItem  } from "../typings";
const models = require("../models"); 
 
export default class Client {
    public static async getAllByQuery(query : any) : Promise<Array<any>> {
        const result = await models.Client.findAll(query)
        return result; 
    }    
}