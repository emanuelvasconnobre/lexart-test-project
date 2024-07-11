// src/middlewares/errorHandler.ts

import { AppException, HttpException } from "exceptions/protocols";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export function exceptionMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json(error.serialize());
  } else if (error instanceof AppException) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error.serialize());
  } else {
    console.log(error);
    return res.status(500).json({
      error: {
        message: "Erro interno do servidor",
      },
    });
  }
}
