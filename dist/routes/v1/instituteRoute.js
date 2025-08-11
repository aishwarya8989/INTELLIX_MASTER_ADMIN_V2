"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instituteRoute = void 0;
const express_1 = __importDefault(require("express"));
const instituteController_1 = require("../../controllers/instituteController");
const app = (0, express_1.default)();
const instituteRoute = express_1.default.Router();
exports.instituteRoute = instituteRoute;
instituteRoute.post("/", instituteController_1.instituteController.addInstitute);
