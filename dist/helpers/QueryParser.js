"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryParser {
    static parseToArray(data) {
        if (typeof (data) == "string") {
            return [parseInt(data)];
        }
        if (typeof (data) == "object") {
            return data.map((el) => parseInt(el));
        }
        return [];
    }
}
exports.default = QueryParser;
