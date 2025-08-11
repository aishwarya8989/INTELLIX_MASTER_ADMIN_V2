import express, { Application, Router } from "express";
import { instituteAdminController } from "../../controllers/instituteAdmin";
const app:Application=express()

const instituteAdminRoute:Router=express.Router();

instituteAdminRoute.post("/add",instituteAdminController.addAdmin)

export {instituteAdminRoute};