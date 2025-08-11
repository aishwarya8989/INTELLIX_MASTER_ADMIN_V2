import { InstituteRepo } from "../repositories/institute"
import { CustomError } from "../utils/customErrorHandler";
const InstituteRepository = new InstituteRepo();
import {StatusCodes} from "http-status-codes"
export const instituteService = {
    addInstitute: async (data: { name: string; code: number; active: boolean }) => {

        let check = await InstituteRepository.findOne({ name: data.name});
        let checkCode = await InstituteRepository.findOne({  code:data.code});

        if (checkCode) {
            throw new CustomError("institute already exists with this school code",StatusCodes.NOT_ACCEPTABLE)
        }
        if (check) {
            throw new CustomError("institute already exists",StatusCodes.NOT_ACCEPTABLE)
        }

        return await InstituteRepository.create(data) 
    }
}