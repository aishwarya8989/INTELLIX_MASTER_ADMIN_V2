"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.masterAdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const masterAdmin_1 = require("../../controllers/masterAdmin");
const authorization_1 = require("../../middleware/authorization");
const app = (0, express_1.default)();
const masterAdminRoute = express_1.default.Router();
exports.masterAdminRoute = masterAdminRoute;
masterAdminRoute.post("/add", masterAdmin_1.masterAdminController.addAdmin);
masterAdminRoute.post("/login", masterAdmin_1.masterAdminController.adminLogin);
masterAdminRoute.get("/logout", authorization_1.validateMasterAdminToken, masterAdmin_1.masterAdminController.adminLogout);
