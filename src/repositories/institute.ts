import { CrudRepository } from "./crudRepositorie"

export class InstituteRepo extends CrudRepository {

    constructor() {
        super('institute'); // 'institute' should match the Prisma model name (lowercase)
    }
}