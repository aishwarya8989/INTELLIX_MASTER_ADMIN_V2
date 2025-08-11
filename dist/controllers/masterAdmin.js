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
exports.masterAdminController = void 0;
const tryCatchHandler_1 = require("../utils/tryCatchHandler");
const masterAdmin_1 = require("../validators/masterAdmin");
const customErrorHandler_1 = require("../utils/customErrorHandler");
const masterAdmin_2 = require("../services/masterAdmin");
const http_status_codes_1 = require("http-status-codes");
const masterAdminController = {
    addAdmin: (0, tryCatchHandler_1.try_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = masterAdmin_1.createMasterAdminSchema.pick({ email: true, password: true, contact_no: true }).safeParse(req.body);
        if (!result.success) {
            throw new customErrorHandler_1.CustomError(result.error.errors.map(err => err.message).join(", "), http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        yield masterAdmin_2.adminService.addAdmin(req.body);
        res.status(201).send({ success: true, message: "Admin added successfully" });
        return;
    })),
    adminLogin: (0, tryCatchHandler_1.try_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = masterAdmin_1.createMasterAdminSchema.pick({ email: true, password: true }).safeParse(req.body);
        if (!result.success) {
            throw new customErrorHandler_1.CustomError(result.error.errors.map(err => err.message).join(", "), http_status_codes_1.StatusCodes.NOT_ACCEPTABLE);
        }
        const token = yield masterAdmin_2.adminService.adminLogin(req.body);
        res.status(200).send({ success: true, message: "Login successfully", token: token });
        return;
    })),
    adminLogout: (0, tryCatchHandler_1.try_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = masterAdmin_1.createMasterAdminSchema.pick({ id: true }).safeParse({ id: req.user.id });
        if (!result.success) {
            throw new customErrorHandler_1.CustomError(result.error.errors.map(err => err.message).join(", "), http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        yield masterAdmin_2.adminService.adminLogout(req.user.id);
        res.status(200).send({ success: true, message: "Logout successfully" });
        return;
    })),
};
exports.masterAdminController = masterAdminController;
