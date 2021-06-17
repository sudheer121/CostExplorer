"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models = require("../models");
class CostExplorerQueryBuilder {
    constructor(client_id_array, project_id_array, cost_type_id_array) {
        this.clientQueryObject = (client_id_array.length) ? {
            id: client_id_array
        } : {};
        this.projectQueryObject = (project_id_array.length) ? {
            id: project_id_array
        } : {};
        this.query = {
            where: this.clientQueryObject,
            attributes: ['id', 'amount', 'name', 'type'],
            include: [{
                    model: models.Project,
                    as: 'children',
                    attributes: ['id', 'amount', ['title', 'name'], 'type'],
                    where: this.projectQueryObject,
                    include: [{
                            attributes: ['amount', ['cost_type_id', 'id']],
                            model: models.Cost,
                            as: "children",
                            where: {
                                'cost_type_id': cost_type_id_array
                            }
                        }],
                }],
            order: [
                ['id', 'ASC'],
                [{ model: models.Project, as: "children" }, 'id', 'ASC']
            ],
        };
    }
    getQuery() {
        return this.query;
    }
}
exports.default = CostExplorerQueryBuilder;
