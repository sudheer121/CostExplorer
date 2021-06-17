import { IData , INest } from "../typings";
import Graph from "./Graph";

export class DataArrayNester {
    protected graphAdjacencyList : Array<Array<number>> 
    protected idSet : Set<number>; 
    protected dataHash : {
        [id : number] : IData
    }; 
    protected nesting : INest; 
    constructor(graph: Graph, dataArray : Array<IData>) {
        this.nesting = {
            id : 0,
            children : []
        }
        this.graphAdjacencyList = graph.getAdjacencyList();
        this.dataHash = {}; 
        this.idSet = new Set(dataArray.map((el : IData) => el.id)); 
        dataArray.forEach((el : IData) => {
            this.dataHash[el.id] = el; 
        })
        
    }   

    private nesterDFS(node: number) : INest  {
        let currentNode : INest = {
            id : node,
            children : [] 
        }; 

        if(this.idSet.has(node)) {
            let data : IData = this.dataHash[node]; 
            currentNode = { 
                ...data,
                children : [] 
            }
            return currentNode; 
        }
        
        if(this.graphAdjacencyList[node]){
            let children : Array<INest> = []; 
            this.graphAdjacencyList[node].forEach((child : number) =>{
                let node : INest = this.nesterDFS(child); 
                if(node.id !== -1){
                    children.push(node); 
                }
            })
            currentNode.children = children; 
        }
        if(!currentNode.children.length) { 
            currentNode.id = -1
        }
        return currentNode; 
    }

    public getNesting() : INest{
        const nesting : INest = this.nesterDFS(0); 
        return nesting; 
    }
}