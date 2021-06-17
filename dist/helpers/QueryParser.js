"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queryparser {
    static parseToArray(data) {
        //return [parseInt(data)]; 
        if (typeof (data) == "string") {
            return [parseInt(data)];
        }
        if (typeof (data) == "object") {
            return data.map((el) => parseInt(el));
        }
        return [];
    }
}
exports.default = Queryparser;
