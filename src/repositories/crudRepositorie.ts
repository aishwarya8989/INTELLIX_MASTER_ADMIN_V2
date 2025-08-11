import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CrudRepository {
  private model: any;

  constructor(model: any) {
    this.model = prisma[model];
  }

  async create(data:any) {
    console.log(data, '*******************************data');
    return await this.model.create({ data });
  }

  async getData() {
    return await this.model.findMany();
  }

  async findOne(query:object) {
    return await this.model.findFirst({ where: query });
  }

  async getOneData(dataToFind:object) {
    return await this.model.findFirst({ where: dataToFind });
  }

  async getDataById(id:Number) {
    return await this.model.findUnique({ where: { id } });
  }

  async update(data:any, dataToUpdate:any) {
    return await this.model.updateMany({
      where: dataToUpdate,
      data,
    });
  }

  async findAll(query:Object) {
    return await this.model.findMany({ where: query });
  }

  async insertMany(data:any[]) {
    return await this.model.createMany({ data });
  }

  async deleteData(condition:object) {
    return await this.model.delete({
      where:  condition ,
    });
  }

  async deleteDataSub(condition:object) {
    return await this.model.deleteMany({ where: condition });
  }
}
