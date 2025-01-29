import express from "express";
import { ResCode } from "../enums";
import { get, merge } from "lodash";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "user._id") as unknown as string;

    if (!id) {
      console.log("Resource ID not provided");
      res.status(ResCode.BAD_REQUEST).json({ message: "Bad Request: Resource ID not provided" });
      return;
    }

    if (!currentUserId) {
      console.log("User ID not found in request");
      res.status(ResCode.FORBIDDEN).json({ message: "Forbidden: User ID not found" });
      return;
    }

    if (currentUserId.toString() !== id) {
      console.log(`User ${currentUserId} is not the owner of resource ${id}`);
      res
        .status(ResCode.FORBIDDEN)
        .json({ message: "Forbidden: You are not the owner of this resource" });
      return;
    }

    console.log(`User ${currentUserId} is the owner of resource ${id}`);
    merge(req, { user: currentUserId });
    next();
  } catch (error) {
    console.error("Error on isOwner: ", error);
    next(error);
  }
};
