import express, { Application, Router } from "express";
import { instituteRoute } from "./instituteRoute";
const app : Application=express()
const v1Route  :Router =express.Router();


v1Route.use("/institute",instituteRoute);

export {v1Route}