import express, { Application, Router } from "express";
import { instituteRoute } from "./instituteRoute";
import { masterAdminRoute } from "./masterAdmin";
import { instituteAdminRoute } from "./instituteAdmin";
const app : Application=express()
const v1Route  :Router =express.Router();


v1Route.use("/institute",instituteRoute);
v1Route.use("/master/admin",masterAdminRoute);
v1Route.use("/institute/admin",instituteAdminRoute);

export {v1Route}