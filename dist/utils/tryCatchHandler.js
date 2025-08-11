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
exports.try_catch = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const customErrorHandler_1 = require("./customErrorHandler");
// Fix 3: Return type Promise<void>, not Response
const try_catch = (handler) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
                yield handler(req, res, next, tx);
            }));
        }
        catch (err) {
            console.error("Rolling back due to error:", err);
            if (err instanceof zod_1.ZodError) {
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    error: err.errors.map((e) => ({ message: e.message })),
                });
                return;
            }
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                res.status(400).json({
                    success: false,
                    message: "Database error",
                    error: [{ message: err.message }],
                });
                return;
            }
            if (err instanceof customErrorHandler_1.CustomError || (err.statusCode && err.message)) {
                res.status(err.statusCode || 400).json({
                    success: false,
                    message: "Something went wrong",
                    error: [{ message: err.message }],
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: [{ message: err.message || "Unknown error" }],
            });
        }
    });
};
exports.try_catch = try_catch;
