import { UnauthorizedHttpException } from "exceptions/http-exceptions";
import { NextFunction, Request, Response } from "express";

export const isAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.id) {
    next();
  } else {
    next(new UnauthorizedHttpException());
  }
};
