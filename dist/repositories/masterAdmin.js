"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterAdminRepo = void 0;
const crudRepositorie_1 = require("./crudRepositorie");
class MasterAdminRepo extends crudRepositorie_1.CrudRepository {
    constructor() {
        super('masterAdmin'); // 'masteradmin' should match the Prisma model name (lowercase)
    }
}
exports.MasterAdminRepo = MasterAdminRepo;
