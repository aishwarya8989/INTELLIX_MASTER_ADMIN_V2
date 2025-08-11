import { CrudRepository } from "./crudRepositorie"

export class MasterAdminRepo extends CrudRepository {

    constructor() {
        super('masterAdmin'); // 'masteradmin' should match the Prisma model name (lowercase)
    }
}