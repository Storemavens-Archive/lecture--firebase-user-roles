import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import logger from "./utils/logger";
import { auth } from "./vendor/firebase.vendor";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined | void> => {
  const { authorization } = req.headers;

  // return forbidden if no authorization header exists
  if (!authorization)
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: ReasonPhrases.FORBIDDEN });

  try {
    // decode auth and add id to res.locals
    const decodedToken = await auth.verifyIdToken(authorization);
    res.locals.userId = decodedToken.email;
    next();
  } catch (err) {
    logger.error(err);
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: ReasonPhrases.FORBIDDEN });
  }
};

export default authMiddleware;
