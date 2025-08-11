import express, { Application, Router } from "express";
import { masterAdminController } from "../../controllers/masterAdmin";
import { validateMasterAdminToken } from "../../middleware/authorization";
const app:Application=express()

const masterAdminRoute:Router=express.Router();

masterAdminRoute.post("/add",masterAdminController.addAdmin)
masterAdminRoute.post("/login",masterAdminController.adminLogin)
masterAdminRoute.get("/logout",validateMasterAdminToken,masterAdminController.adminLogout)

export {masterAdminRoute};