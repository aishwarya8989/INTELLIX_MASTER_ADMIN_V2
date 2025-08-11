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
exports.validateMasterAdminToken = void 0;
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const validateMasterAdminToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Bearer token required" });
            return;
        }
        const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
        const masterAdmin = yield prismaClient_1.default.masterAdmin.findFirst({
            where: { token },
        });
        if (!masterAdmin) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        // Attach user to request if needed
        req.user = masterAdmin;
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        return;
    }
});
exports.validateMasterAdminToken = validateMasterAdminToken;
