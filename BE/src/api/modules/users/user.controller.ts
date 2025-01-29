// src/api/modules/user/user.controller.ts
import express from "express";
import { ResCode } from "../../enums";
import { UserService } from "./user.service";
import { get } from "lodash";

export const UserController = {
  getAllUsers: async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const users = await UserService.getUsers();
      res.status(ResCode.OK).json(users);
    } catch (error) {
      console.log("Error on getAllUsers: ", error);
      res.sendStatus(ResCode.BAD_REQUEST);
    }
  },

  deteleUser: async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleteUser = await UserService.deleteUserById(id);

      res.json(deleteUser);
    } catch (error) {
      console.log("Error", error);
      res.sendStatus(ResCode.BAD_REQUEST);
      return;
    }
  },

  updateUser: async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { username } = req.body;

      const user = await UserService.getUserById(id);

      user!.username = username;
      await user!.save();

      res.sendStatus(ResCode.OK).end();
      return;
    } catch (error) {
      console.log("Error Update", error);
      res.sendStatus(ResCode.BAD_REQUEST);
      return;
    }
  },
  getUserById: async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const id = get(req, "user._id") as unknown as string;
      const users = await UserService.getUserById(id);
      res.status(ResCode.OK).json(users);
    } catch (error) {
      console.log("Error Update", error);
      res.sendStatus(ResCode.BAD_REQUEST);
      return;
    }
  },
};

export default UserController;
