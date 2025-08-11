import { CrudRepository } from "./crudRepositorie"

export class InstAdminRepo extends CrudRepository {

    constructor() {
        super('instAdmin'); // 'instAdmin' should match the Prisma model name (lowercase)
    }
}