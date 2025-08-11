import express, { Application, Router } from "express";
import { instituteController } from "../../controllers/instituteController";
const app:Application=express()

const instituteRoute:Router=express.Router();

instituteRoute.post("/add",instituteController.addInstitute)
instituteRoute.get("/fetch",instituteController.getInstitutes)

export {instituteRoute};