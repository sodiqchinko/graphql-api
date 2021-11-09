import bcrypt from 'bcryptjs';
import jwt from "../helpers/jwt";
import userService from "./userService";
import {UniqueConstraintError} from "sequelize";

const generateAccessToken = async (user) => {
    let {uuid, email} = user.dataValues;
    const token = await jwt.generateToken({uuid, email});
    return {token}
}
export default class AuthService {
    static signUp = async (args, ctx) => {
        try {
            const hashedPassword = await bcrypt.hash(args.password, 10);
            const user = await userService.createUser({...args, password: hashedPassword}, ctx);
            const {token} = await generateAccessToken(user);
            return {
                token,
                user
            }
        } catch (e) {
            if (e instanceof UniqueConstraintError) {
                return new Error("Account already exists.");
            }
            return new Error(e.message);
        }

    };
    static login = async (args, ctx) => {
        try {
            const user = await ctx.models.User.findOne({where: {email: args.email}});
            if (!user)
                return new Error('Invalid email or password');
            const passwordCheck = await bcrypt.compare(args.password, user.password);
            if (!passwordCheck)
                return new Error('Invalid email or password');
            const {token} = await generateAccessToken(user);
            return {
                token,
                user
            }
        } catch (e) {
            return new Error(e.message);
        }

    };
}
