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
exports.instituteAdminController = void 0;
const tryCatchHandler_1 = require("../utils/tryCatchHandler");
const customErrorHandler_1 = require("../utils/customErrorHandler");
const http_status_codes_1 = require("http-status-codes");
const instituteAdmin_1 = require("../validators/instituteAdmin");
const instituteAdmin_2 = require("../services/instituteAdmin");
const instituteAdminController = {
    addAdmin: (0, tryCatchHandler_1.try_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = instituteAdmin_1.instAdminCreateSchema.pick({ email: true, password: true, instituteId: true, name: true }).safeParse(req.body);
        if (!result.success) {
            throw new customErrorHandler_1.CustomError(result.error.errors.map(err => err.message).join(", "), http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        yield instituteAdmin_2.adminService.addAdmin(req.body);
        res.status(201).send({ success: true, message: "Admin added successfully" });
        return;
    })),
};
exports.instituteAdminController = instituteAdminController;
