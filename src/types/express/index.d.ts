import { MasterAdmin } from "@prisma/client"; 

declare global {
  namespace Express {
    export interface Request {
      user?: MasterAdmin;
    }
  }
}
