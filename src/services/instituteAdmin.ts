import { InstituteRepo } from "../repositories/institute";
import { InstAdminRepo } from "../repositories/instituteAdmin";
const adminRepository = new InstAdminRepo();
const instituteRepository = new InstituteRepo();
import { StatusCodes } from "http-status-codes"
import { CustomError } from "../utils/customErrorHandler";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const adminService = {
    addAdmin: async (data: { email: string; password: string; instituteId: number, name: string }) => {
        let check_email = await adminRepository.findOne({ email: data.email });
        if (check_email) {

            throw new CustomError("Email already exsits", StatusCodes.CONFLICT);

        }

        let check_instID = await instituteRepository.findOne({ id: data.instituteId });
        if (!check_instID) {

            throw new CustomError("Institute not found", StatusCodes.NOT_FOUND);

        }
        const hashPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashPassword
        await adminRepository.create(data);
    },



}