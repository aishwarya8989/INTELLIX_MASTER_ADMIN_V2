import { Request, Response } from "express";
import { try_catch } from "../utils/tryCatchHandler";
import { createMasterAdminSchema } from "../validators/masterAdmin";
import { CustomError } from "../utils/customErrorHandler";
import { adminService } from "../services/masterAdmin";
import { StatusCodes } from "http-status-codes";

const masterAdminController = {
    addAdmin: try_catch(
        async (req: Request, res: Response) => {

            const result = createMasterAdminSchema.pick({ email: true, password: true, contact_no: true }).safeParse(req.body);

            if (!result.success) {


                throw new CustomError(result.error.errors.map(err => err.message).join(", "), StatusCodes.BAD_REQUEST);
            }
            await adminService.addAdmin(req.body);


            res.status(201).send({ success: true, message: "Admin added successfully" });
            return
        }
    ),

    adminLogin: try_catch(
        async (req: Request, res: Response) => {
            const result = createMasterAdminSchema.pick({ email: true, password: true }).safeParse(req.body);

            if (!result.success) {

                throw new CustomError(result.error.errors.map(err => err.message).join(", "), StatusCodes.NOT_ACCEPTABLE);
            }
            const token = await adminService.adminLogin(req.body);
            res.status(200).send({ success: true, message: "Login successfully", token: token });
            return
        }
    ),

    adminLogout: try_catch(
        async (req: Request, res: Response) => {
            const result = createMasterAdminSchema.pick({ id: true }).safeParse({ id: req.user!.id });

            if (!result.success) {

                throw new CustomError(result.error.errors.map(err => err.message).join(", "), StatusCodes.BAD_REQUEST);
            }
            await adminService.adminLogout(req.user!.id);
            res.status(200).send({ success: true, message: "Logout successfully" });
            return
        }
    ),

}

export { masterAdminController }