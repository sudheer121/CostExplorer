import { CacheSingleton } from '../cache/Cache';
import { IExplorerItem, INest } from '../typings';
 
export default class ExplorerItem {
    private nestedData : IExplorerItem;

    constructor(nestedData : IExplorerItem) { 
        this.nestedData = nestedData; 
    }

    private dataNester(nestedData : any) : IExplorerItem {
        let node : any = nestedData;
        if(!node.type){
            node.type = 'cost'
            node.name = CacheSingleton.getCostTypeHash()[node.id].name; 
        }
        node.amount = (node.amount) ? parseFloat(node.amount) : 0;  
        if(node.children) {
            node.children = node.children.map((child : any) =>{
                let childNode = this.dataNester(child); 
                node.amount = node.amount + childNode.amount;
                return childNode;  
            })
        }
        return node; 
    }

    public getNesting() : IExplorerItem {
        return this.dataNester(this.nestedData); 
    }
}