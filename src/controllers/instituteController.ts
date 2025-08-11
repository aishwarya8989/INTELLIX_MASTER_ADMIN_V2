import { Request, Response } from "express";
import { Institute } from "@prisma/client";
import { try_catch } from "../utils/tryCatchHandler";
import { instituteService } from "../services/institute";
import { instituteSchema } from "../validators/institute";

const instituteController = {
    addInstitute: try_catch(async (req: Request, res: Response) => {

        instituteSchema.parse(req.body); // Will throw if invalid
        let data: Institute = await instituteService.addInstitute(req.body)
        res.send({ success: true, message: "successfully added" })
        return
    }),


    getInstitutes: try_catch(async (req: Request, res: Response) => {
        const institutes = await instituteService.getInstitutes();
        res.send({ success: true, institutes })
        return
    })

}

export { instituteController }