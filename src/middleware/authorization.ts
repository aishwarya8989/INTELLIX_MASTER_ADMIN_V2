import { Request, Response, NextFunction } from "express";
import prisma from "../config/prismaClient";

export const validateMasterAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Bearer token required" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    const masterAdmin = await prisma.masterAdmin.findFirst({
      where: { token },
    });

    if (!masterAdmin) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user to request if needed
    // req.query.user = masterAdmin;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
