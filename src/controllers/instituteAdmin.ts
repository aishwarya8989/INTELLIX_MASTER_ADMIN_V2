import { Request, Response } from "express";
import { try_catch } from "../utils/tryCatchHandler";
import { CustomError } from "../utils/customErrorHandler";
import { StatusCodes } from "http-status-codes";
import { instAdminCreateSchema } from "../validators/instituteAdmin";
import { adminService } from "../services/instituteAdmin";

const instituteAdminController = {
    addAdmin: try_catch(
        async (req: Request, res: Response) => {

            const result = instAdminCreateSchema.pick({ email: true, password: true, instituteId: true, name: true }).safeParse(req.body);

            if (!result.success) {


                throw new CustomError(result.error.errors.map(err => err.message).join(", "), StatusCodes.BAD_REQUEST);
            }
            await adminService.addAdmin(req.body);


            res.status(201).send({ success: true, message: "Admin added successfully" });
            return
        }
    ),

   

}

export { instituteAdminController }