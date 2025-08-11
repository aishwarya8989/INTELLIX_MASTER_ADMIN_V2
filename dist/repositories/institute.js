"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituteRepo = void 0;
const crudRepositorie_1 = require("./crudRepositorie");
class InstituteRepo extends crudRepositorie_1.CrudRepository {
    constructor() {
        super('institute'); // 'institute' should match the Prisma model name (lowercase)
    }
}
exports.InstituteRepo = InstituteRepo;
