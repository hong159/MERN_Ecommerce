// src/api/modules/user/user.controller.ts
import express from "express";
import { ResCode } from "../../enums";
import { userService } from "./user.service";
import { authHepler } from "../../helpers";

export const UserController = {
    login: async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.sendStatus(ResCode.BAD_REQUEST);
                return;
            }

            const user = await userService.getUserByEmail(email).select('+authentication.salt +authentication.password');
            if (!user) {
                res.sendStatus(ResCode.BAD_REQUEST);
                return;
            }

            const expectedHash = authHepler.authentication(user.authentication.salt, password);

            if (expectedHash !== user.authentication.password) {
                res.sendStatus(ResCode.FORBIDDEN);
                return;
            }

            const salt = authHepler.random();
            user.authentication.sessionToken = authHepler.authentication(salt, user._id.toString());

            await user.save();

            res.cookie('Libra-Auth', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

            res.status(ResCode.OK).json(user).end();
            return;
        }
        catch (error) {
            console.log('Error on login: ', error);
            res.status(ResCode.BAD_REQUEST);
            return;
        }
    },
    register: async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const { email, password, username } = req.body;
            if (!email || !password || !username) {
                res.status(ResCode.BAD_REQUEST).send('Missing required fields');
                return;
            }

            const existingUser = await userService.getUserByEmail(email);

            if (existingUser) {
                res.status(ResCode.BAD_REQUEST).send('User already exists');
                return;
            }

            const salt = authHepler.random();
            const user = await userService.createUser({
                email,
                username,
                authentication: {
                    salt,
                    password: authHepler.authentication(salt, password),
                },
            });

            res.status(ResCode.CREATED).json(user).end();
            return;
        }
        catch (error) {
            console.log('Error on register: ', error);
            res.status(ResCode.BAD_REQUEST);
            return;
        }
    },
    getAllUsers: async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const users = await userService.getUsers();
            res.status(ResCode.OK).json(users);
        } catch (error) {
            console.log('Error on getAllUsers: ', error);
            res.sendStatus(ResCode.BAD_REQUEST);
        }
    },

    deteleUser: async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const { id } = req.params;
            const deleteUser = await userService.deleteUserById(id);

            res.json(deleteUser);

        }
        catch (error) {
            console.log('Error', error)
            res.sendStatus(ResCode.BAD_REQUEST);
            return;
        }

    },

    updateUser: async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { username } = req.body;

            const user = await userService.getUserById(id);

            user!.username = username
            await user!.save();

            res.sendStatus(ResCode.OK).end();
            return;
        } catch (error) {
            console.log("Error Update", error);
            res.sendStatus(ResCode.BAD_REQUEST)
            return;
        }
    }
};

export default UserController;