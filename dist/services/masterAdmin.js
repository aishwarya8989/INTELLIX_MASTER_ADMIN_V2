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
const masterAdmin_1 = require("../repositories/masterAdmin");
const adminRepository = new masterAdmin_1.MasterAdminRepo();
const http_status_codes_1 = require("http-status-codes");
const customErrorHandler_1 = require("../utils/customErrorHandler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const saltRounds = 10;
exports.adminService = {
    addAdmin: (data) => __awaiter(void 0, void 0, void 0, function* () {
        let check_email = yield adminRepository.findOne({ email: data.email });
        if (check_email) {
            throw new customErrorHandler_1.CustomError("Email already exsits", http_status_codes_1.StatusCodes.CONFLICT);
        }
        let check_m_number = yield adminRepository.findOne({ contact_no: data.contact_no });
        if (check_m_number) {
            throw new customErrorHandler_1.CustomError("Number already exsits", http_status_codes_1.StatusCodes.CONFLICT);
        }
        const hashPassword = yield bcrypt_1.default.hash(data.password, saltRounds);
        data.password = hashPassword;
        yield adminRepository.create(data);
    }),
    adminLogin: (details) => __awaiter(void 0, void 0, void 0, function* () {
        let check = yield adminRepository.findOne({ email: details.email });
        if (!check) {
            throw new customErrorHandler_1.CustomError("Email not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const isMatch = yield bcrypt_1.default.compare(details.password, check.password);
        if (!isMatch) {
            throw new customErrorHandler_1.CustomError("Incorrect password", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const payload = {
            id: check.id,
            email: check.email
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.ADMIN_PRIVATE_KEY);
        // db me token save karna (Sirf ek device allow karne ke liye)
        yield adminRepository.update({ token: token }, { id: payload.id });
        return token;
    }),
    adminLogout: (id) => __awaiter(void 0, void 0, void 0, function* () {
        let check = yield adminRepository.findOne({ id: id });
        if (!check) {
            throw new customErrorHandler_1.CustomError("Admin not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        yield adminRepository.update({ token: null }, { id: id });
    }),
};
