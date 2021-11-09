import jwt from "./jwt";
import userService from "../services/userService";
import {sequelize} from "../models/index.js";

export const getUser = async (context) => {
    if(context.req){
        const Authorization = context.req.header('Authorization');
        if (Authorization && !context.user) {
            const token = Authorization.replace('Bearer ', '');
            const user = jwt.decodeToken(token);
            if (user.error) {
                return null;
            }
            try {
                return await userService.getUser(user.uuid, sequelize);
            } catch (e) {
                return null;
            }
        }
    }
    return null;
};
