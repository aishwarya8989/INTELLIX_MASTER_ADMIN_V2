import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { apiRoute } from "./routes";
// import prisma from "./config/prismaClient";

const app = express();
const port: number = 8080;


app.use(express.json())
app.use("/api", apiRoute)
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});