"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Route = void 0;
const express_1 = __importDefault(require("express"));
const instituteRoute_1 = require("./instituteRoute");
const app = (0, express_1.default)();
const v1Route = express_1.default.Router();
exports.v1Route = v1Route;
v1Route.use("/institute", instituteRoute_1.instituteRoute);
