import CostType,{ICostType} from "../dao/CostType";
import { IGraphNode, IData } from "../typings";
import Graph from "../helpers/Graph";

export default class Cache {
    public static async initCache() : Promise<boolean> {
        let resultArray : Array<ICostType> = await CostType.getAll(); 
        let resultNodeArray = resultArray.map((node : ICostType) => {
            if(node.parent_id == null) {
                node.parent_id = 0; 
            }
            const graphNode : IGraphNode = {
                ...node
            }
            return graphNode; 
        })
        console.log(resultNodeArray); 
        const graph = new Graph(resultNodeArray.length, resultNodeArray);

        CacheSingleton.setCostTypeHash(resultArray);
        CacheSingleton.setCostTypeGraph(graph); 
        return true;
    }
}; 


export class CacheSingleton {
    private static costTypeGraph : Graph; 
    private static costTypeHash : {
        [id : number] : ICostType
    }; 
    public static setCostTypeGraph(graph: Graph){
        this.costTypeGraph = graph; 
    }
    public static getCostTypeGraph() : Graph {
        return this.costTypeGraph; 
    }
    public static setCostTypeHash(data : Array<ICostType>){ 
        this.costTypeHash = {}; 
        for(let i:number = 0; i < data.length; i++){
            this.costTypeHash[data[i].id] = data[i]; 
        }
    }
    public static getCostTypeHash(){
        return this.costTypeHash; 
    }
}