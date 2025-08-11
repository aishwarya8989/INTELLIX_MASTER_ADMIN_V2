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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const institute_1 = require("../repositories/institute");
const instituteAdmin_1 = require("../repositories/instituteAdmin");
const adminRepository = new instituteAdmin_1.InstAdminRepo();
const instituteRepository = new institute_1.InstituteRepo();
const http_status_codes_1 = require("http-status-codes");
const customErrorHandler_1 = require("../utils/customErrorHandler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
exports.adminService = {
    addAdmin: (data) => __awaiter(void 0, void 0, void 0, function* () {
        let check_email = yield adminRepository.findOne({ email: data.email });
        if (check_email) {
            throw new customErrorHandler_1.CustomError("Email already exsits", http_status_codes_1.StatusCodes.CONFLICT);
        }
        let check_instID = yield instituteRepository.findOne({ id: data.instituteId });
        if (!check_instID) {
            throw new customErrorHandler_1.CustomError("Institute not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const hashPassword = yield bcrypt_1.default.hash(data.password, saltRounds);
        data.password = hashPassword;
        yield adminRepository.create(data);
    }),
};
