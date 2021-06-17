export interface IGraphNode {
    id : number | null,
    parent_id : number 
}

export interface IData {
    id : number 
}

export interface IDataHash {
    [id : number] : IData
}

export interface INest {
    id : number ,
    children : INest[] 
}

export interface IExplorerItem {
    id : number,
    name : string,
    amount : number,
    type : 'client' | 'project' | 'cost'
    children : IExplorerItem[] 
}

export interface CostExplorerOutput {
    query : String, 
    data : IExplorerItem[] 
}
