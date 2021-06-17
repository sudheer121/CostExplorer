import { Request, Response, NextFunction } from 'express';
import Controller, { Methods } from '../typings/Controller';
import QueryParser from '../helpers/QueryParser';
import { CacheSingleton } from '../cache/Cache';
import { IExplorerItem, CostExplorerOutput } from '../typings';
import CostExplorer from '../services/CostExplorer';

export default class ExplorerController extends Controller {
    path = '/explorer';
    routes = [
        {
            path: '',
            method: Methods.GET,
            handler: this.handleAddRep,
            localMiddleware : []
        }
    ];

    async handleAddRep(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            let {
                client_id,
                cost_type_id ,
                project_id 
            } = req.query;

            let client_id_array : Array<number> = QueryParser.parseToArray(client_id); 
            let cost_type_id_array : Array<number> = QueryParser.parseToArray(cost_type_id);
            let project_id_array : Array<number> = QueryParser.parseToArray(project_id); 
            if(!cost_type_id_array.length){
                cost_type_id_array = CacheSingleton.getCostTypeGraph().getLeaves(); 
            }
            
            let explorerObject: CostExplorer = new CostExplorer(); 
            explorerObject.setClientArray(client_id_array);
            explorerObject.setProjectArray(project_id_array);
            explorerObject.setCostTypeArray(cost_type_id_array); 

            let data : Array<IExplorerItem> = await explorerObject.getExplorerResult(); 

            const result : CostExplorerOutput = {
                query : req.protocol + '://' + req.get('host') + req.url,
                data : data
            }
            super.sendSuccess(res, result); 
        } catch(e) {
            console.log(e);
            super.sendError(res);
        }
    }
}
