"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = 8080;
app.use("/api", routes_1.apiRoute);
app.get("/", (req, res) => {
    res.send("Hello, TypeScript Express!");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
