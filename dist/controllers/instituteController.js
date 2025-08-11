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
exports.instituteController = void 0;
const tryCatchHandler_1 = require("../utils/tryCatchHandler");
const institute_1 = require("../services/institute");
const institute_2 = require("../validators/institute");
const instituteController = {
    addInstitute: (0, tryCatchHandler_1.try_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        institute_2.instituteSchema.parse(req.body); // Will throw if invalid
        let data = yield institute_1.instituteService.addInstitute(req.body);
        res.send({ success: true, message: "successfully added" });
        return;
    })),
    getInstitutes: (0, tryCatchHandler_1.try_catch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const institutes = yield institute_1.instituteService.getInstitutes();
        res.send({ success: true, institutes });
        return;
    }))
};
exports.instituteController = instituteController;
