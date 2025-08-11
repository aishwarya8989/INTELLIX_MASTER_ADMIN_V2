import express, { Application, Router } from "express";
import { v1Route } from "./v1";
const app : Application=express()
const apiRoute  :Router =express.Router();

apiRoute.use("/v1",v1Route);

export {apiRoute}