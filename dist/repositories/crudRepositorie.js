"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CrudRepository {
    constructor(model) {
        this.model = prisma[model];
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data, '*******************************data');
            return yield this.model.create({ data });
        });
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findMany();
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findFirst({ where: query });
        });
    }
    getOneData(dataToFind) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findFirst({ where: dataToFind });
        });
    }
    getDataById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findUnique({ where: { id } });
        });
    }
    update(data, dataToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.updateMany({
                where: dataToUpdate,
                data,
            });
        });
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findMany({ where: query });
        });
    }
    insertMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.createMany({ data });
        });
    }
    deleteData(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.delete({
                where: condition,
            });
        });
    }
    deleteDataSub(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.deleteMany({ where: condition });
        });
    }
}
exports.CrudRepository = CrudRepository;
