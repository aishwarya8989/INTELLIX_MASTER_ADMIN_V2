import { Request, Response, NextFunction, RequestHandler } from "express";
import { z, ZodError } from "zod";
import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "../config/prismaClient";
import { CustomError } from "./customErrorHandler";

// Fix 1: Define a narrowed type for tx inside transaction
type TxClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

// Fix 2: Properly typed handler function
type HandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
  tx: TxClient
) => Promise<void>;

// Fix 3: Return type Promise<void>, not Response
export const try_catch = (handler: HandlerFunction): RequestHandler => {
  return async (req, res, next): Promise<void> => {
    try {
      await prisma.$transaction(async (tx) => {
        await handler(req, res, next, tx as TxClient);
      });
    } catch (err: any) {
      console.error("Rolling back due to error:", err);

      if (err instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          error: err.errors.map((e) => ({ message: e.message })),
        });
        return;
      }

      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({
          success: false,
          message: "Database error",
          error: [{ message: err.message }],
        });
        return;
      }

      if (err instanceof CustomError || (err.statusCode && err.message)) {
        res.status(err.statusCode || 400).json({
          success: false,
          message: "Something went wrong",
          error: [{ message: err.message }],
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: [{ message: err.message || "Unknown error" }],
      });
    }
  };
};
