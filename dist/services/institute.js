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
exports.instituteService = void 0;
const institute_1 = require("../repositories/institute");
const customErrorHandler_1 = require("../utils/customErrorHandler");
const InstituteRepository = new institute_1.InstituteRepo();
const http_status_codes_1 = require("http-status-codes");
exports.instituteService = {
    addInstitute: (data) => __awaiter(void 0, void 0, void 0, function* () {
        let check = yield InstituteRepository.findOne({ name: data.name });
        let checkCode = yield InstituteRepository.findOne({ code: data.code });
        if (checkCode) {
            throw new customErrorHandler_1.CustomError("institute already exists with this school code", http_status_codes_1.StatusCodes.NOT_ACCEPTABLE);
        }
        if (check) {
            throw new customErrorHandler_1.CustomError("institute already exists", http_status_codes_1.StatusCodes.NOT_ACCEPTABLE);
        }
        return yield InstituteRepository.create(data);
    }),
    getInstitutes: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield InstituteRepository.getData();
    })
};
