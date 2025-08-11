"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstAdminRepo = void 0;
const crudRepositorie_1 = require("./crudRepositorie");
class InstAdminRepo extends crudRepositorie_1.CrudRepository {
    constructor() {
        super('instAdmin'); // 'instAdmin' should match the Prisma model name (lowercase)
    }
}
exports.InstAdminRepo = InstAdminRepo;
