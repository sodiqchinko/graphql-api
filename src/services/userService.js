import {getPaginate, paginatedResponse} from "../helpers/pagination";


export default class UserService {
    static async getUser(id, ctx) {

        const user = await ctx.models.User.findOne({where: {uuid: id}});
        if (!user) throw new Error('User not found');
        return user
    }

    static async getUsers({page = 1}, ctx) {
        const paginate = getPaginate(page);
        const users = await ctx.models.User.findAndCountAll({
            ...paginate,
        });
        return paginatedResponse(users);
    }

    static async createUser(data, ctx) {
        return await ctx.models.User.create({...data});
    }

    static async updateUser({id, ...data}, ctx) {
        const user = await this.getUser(id, ctx);
        return user.update(data);
    }

    static async deleteUser(id, ctx) {
        const user = await this.getUser(id, ctx);
        return user.destroy();
    }
}
