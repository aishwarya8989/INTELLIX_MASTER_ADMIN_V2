"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instituteAdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const instituteAdmin_1 = require("../../controllers/instituteAdmin");
const app = (0, express_1.default)();
const instituteAdminRoute = express_1.default.Router();
exports.instituteAdminRoute = instituteAdminRoute;
instituteAdminRoute.post("/add", instituteAdmin_1.instituteAdminController.addAdmin);
