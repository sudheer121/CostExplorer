import { IGraphNode, IData, INest } from "../typings";

export default class Graph {
    protected adjacencyList : Array<Array<number>> ; 
    protected leaves : Array<number>; 

    constructor(totalNodes: number, dataArray : Array<any>){
        this.leaves = []; 
        this.adjacencyList = new Array(totalNodes); 
         

        dataArray.forEach((node : IGraphNode) =>{
            let parent_id : number = node.parent_id ? node.parent_id : 0;
            let node_id : number =  node.id ? node.id : 0;
            if(!this.adjacencyList[parent_id]) {
                this.adjacencyList[parent_id] = []; 
            }
            this.adjacencyList[parent_id].push(node_id); 
        })

        console.log(this.adjacencyList); 
        for(let i:number = 0; i <= this.adjacencyList.length; i++){
            let el : Array<number> = this.adjacencyList[i]; 
            if(!el || !el.length){ 
                this.leaves.push(i); 
            }
        }
    };
    public getAdjacencyList() : Array<Array<number>> {
        return this.adjacencyList; 
    }
    public getLeaves() : Array<number> {
        return this.leaves; 
    }
}
