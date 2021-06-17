const models = require("../models"); 
import { CacheSingleton } from '../cache/Cache';
import { DataArrayNester } from '../helpers/DataArrayNester';
import { IData, IExplorerItem, CostExplorerOutput } from '../typings';
import ExplorerItem from '../helpers/ExplorerItem';
import CostExplorerQueryBuilder from "./CostExplorerQueryBuilder"; 
import Client from '../dao/Client';

export default class CostExplorer {
    private clientIdArray : Array<number>;
    private projectIdArray : Array<number>;
    private costTypeIdArray : Array<number>; 

    constructor(){
        this.clientIdArray = [],
        this.projectIdArray = [],
        this.costTypeIdArray = [] 
    }
    
    public setClientArray(data : Array<number>){
        this.clientIdArray = data; 
    }
    public setProjectArray(data : Array<number>){
        this.projectIdArray = data
    }
    public setCostTypeArray(data : Array<number>){
        this.costTypeIdArray = data; 
    }

    public async getExplorerResult() : Promise<Array<IExplorerItem>> {
        let queryobj = new CostExplorerQueryBuilder(this.clientIdArray, this.projectIdArray, this.costTypeIdArray); 
        let query = queryobj.getQuery(); 
        let result : Array<IExplorerItem> = await Client.getAllByQuery(query); 
        result = result.map((node : any) =>  node.get({ plain : true})); 
        
        result = result.map((client : any)=>{
            client.children = client.children.map((project : any)=>{
                let nesterobj : DataArrayNester = new DataArrayNester(CacheSingleton.getCostTypeGraph(),project.children)
                project.children = nesterobj.getNesting().children;
                return project; 
            })
            return client 
        })
        
        result = result.map((client : any) =>{
            let explorerObject= new ExplorerItem(client); 
            return explorerObject.getNesting(); 
        })
        return result;

    }
}

