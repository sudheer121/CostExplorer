export default class QueryParser{
    public static parseToArray(data : any) : Array<number> {
        if(typeof(data) == "string"){
            return [parseInt(data)]; 
        }
        if(typeof(data) == "object"){
            return data.map((el:any) => parseInt(el))
        }
        return []; 
    }  
}