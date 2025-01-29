// src/api/middlewares/errorHandler.ts
import express from "express";
import { ResCode } from "../enums";

export const ErrorHandle = (
  err: Error,
  req: express.Request,
  res: express.Response
) => {
  console.error(err.stack);
  res.status(ResCode.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong!" });
};
