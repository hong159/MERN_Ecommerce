
import { ResCode } from "../../enums";
import { AuthHepler } from "../../helpers";
import express from "express";
import { AuthService } from "./auth.service";
import { UserService } from "../users/user.service"
export const AuthController = {
    login: async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.sendStatus(ResCode.BAD_REQUEST);
                return;
            }

            const user = await AuthService.getUserByEmail(email).select('+authentication.salt +authentication.password');
            if (!user) {
                res.sendStatus(ResCode.BAD_REQUEST);
                return;
            }

            const expectedHash = AuthHepler.authentication(user.authentication.salt, password);

            if (expectedHash !== user.authentication.password) {
                res.sendStatus(ResCode.FORBIDDEN);
                return;
            }

            const salt = AuthHepler.random();
            user.authentication.sessionToken = AuthHepler.authentication(salt, user._id.toString());

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

            const existingUser = await AuthService.getUserByEmail(email);

            if (existingUser) {
                res.status(ResCode.BAD_REQUEST).send('User already exists');
                return;
            }

            const salt = AuthHepler.random();
            const user = await UserService.createUser({
                email,
                username,
                authentication: {
                    salt,
                    password: AuthHepler.authentication(salt, password),
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
}