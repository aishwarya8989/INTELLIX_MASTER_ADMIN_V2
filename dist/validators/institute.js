"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instituteSchema = void 0;
const zod_1 = require("zod");
exports.instituteSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(3).max(100),
    code: zod_1.z.string().trim().min(2).max(10),
    url: zod_1.z.string().url().optional().or(zod_1.z.literal("").transform(() => undefined)),
    machineId: zod_1.z.string().optional(),
    active: zod_1.z.boolean().optional(),
});
