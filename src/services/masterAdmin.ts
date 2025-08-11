import { MasterAdminRepo } from "../repositories/masterAdmin";
const adminRepository = new MasterAdminRepo();
import { StatusCodes } from "http-status-codes"
import { CustomError } from "../utils/customErrorHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const saltRounds = 10;

export const adminService = {
    addAdmin: async (data: { email: string; password: string; contact_no: string }) => {
        let check_email = await adminRepository.findOne({ email: data.email });
        if (check_email) {

            throw new CustomError("Email already exsits", StatusCodes.CONFLICT);

        }

        let check_m_number = await adminRepository.findOne({ contact_no: data.contact_no });
        if (check_m_number) {

            throw new CustomError("Number already exsits", StatusCodes.CONFLICT);

        }
        const hashPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashPassword
        await adminRepository.create(data);
    },

    adminLogin: async (details: { email: string; password: string; }) => {
        let check = await adminRepository.findOne({ email: details.email });

        if (!check) {

            throw new CustomError("Email not found", StatusCodes.NOT_FOUND);

        }
        const isMatch = await bcrypt.compare(details.password, check.password);

        if (!isMatch) {
            throw new CustomError("Incorrect password", StatusCodes.UNAUTHORIZED);
        }
        const payload = {
            id: check.id,
            email: check.email
        };

        const token = jwt.sign(payload, process.env.ADMIN_PRIVATE_KEY as string);


        // db me token save karna (Sirf ek device allow karne ke liye)
        await adminRepository.update({ token: token }, { id: payload.id });

        return token;

    },


    adminLogout: async (id: number) => {

        let check = await adminRepository.findOne({ id: id });

        if (!check) {

            throw new CustomError("Admin not found", StatusCodes.NOT_FOUND);

        }



        await adminRepository.update({ token: null }, { id: id });




    },

}