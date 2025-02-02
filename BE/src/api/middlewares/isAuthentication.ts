import express from "express";
import { ResCode } from "../shared/enums";
import { merge } from "lodash";
import { AuthService } from "../modules/auth/auth.service";
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const sessionToken = req.cookies["Libra-Auth"];

    if (!sessionToken) {
      console.log("No session token provided");
      res.status(ResCode.FORBIDDEN).json({ message: "Unauthorized: No session token provided" });
      return;
    }

    const existingUser = await AuthService.getUserBySessionToken(sessionToken);

    if (!existingUser) {
      console.log("Invalid session token");
      res.status(ResCode.FORBIDDEN).json({ message: "Unauthorized: Invalid session token" });
      return;
    }

    merge(req, { user: existingUser });
    console.log(`User authenticated: ${existingUser.username}`);
    next();
  } catch (error) {
    console.error("Error on isAuthenticated: ", error);
    next(error);
  }
};
