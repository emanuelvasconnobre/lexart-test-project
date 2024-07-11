import { UnauthorizedHttpException } from "exceptions/http-exceptions";
import { NextFunction, Request, Response } from "express";

export const isAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && (req.session as any).user) {
    console.log(req.session.id);
    next();
  } else {
    throw new UnauthorizedHttpException();
  }
};
