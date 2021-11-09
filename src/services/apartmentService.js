import {getPaginate, paginatedResponse} from "../helpers/pagination";
import {Sequelize} from "../models/index.js";


export default class ApartmentService {
    static async getApartment(id, ctx) {
        const apartment = await ctx.models.Apartment.findOne({where: {uuid: id}});
        if (!apartment) throw new Error('Apartment not found');
        return apartment
    }

    static async getApartments({page = 1}, ctx) {
        const paginate = getPaginate(page);
        const apartments = await ctx.models.Apartment.findAndCountAll({
            where: {owner: ctx.user.uuid},
            ...paginate,
        });
        return paginatedResponse(apartments);
    }

    static async searchApartment({page = 1, noRooms, city, state, country, geoLocation}, ctx) {
        const paginate = getPaginate(page);
        const include = [
            {
                model: ctx.models.Room,
                attributes: [],
                duplicating: false
            }
        ];

        let having = [];
        let where = {};

        if (noRooms !== undefined) {
            having = Sequelize.literal(`count("Room"."apartment") = ${noRooms}`);
        }

        if (city) {
            where = {
                ...where,
                city: city,
            };
        }
        if (state) {
            where = {
                ...where,
                state: state,
            };
        }

        if (country) {
            where = {
                ...where,
                country: country,
            };
        }

        if (geoLocation) {
            const distance = Sequelize.literal(`6371 * acos(cos(radians(${geoLocation.lat})) * cos(radians(lat)) * cos(radians(${geoLocation.lng}) - radians(lng)) + sin(radians(${geoLocation.lat})) * sin(radians(lat)))`)
            where = Sequelize.where(distance, {[Sequelize.Op.lte]: geoLocation.distanceKM})
        }

        const [total, data] = await Promise.all([
            ctx.models.Apartment.count({
                distinct: true, include, where, having
            }),
            ctx.models.Apartment.findAll({
                attributes: {
                    include: [
                        [Sequelize.fn("COUNT", Sequelize.col("Room.apartment")), "roomCount"],
                    ],
                },
                group: ['Apartment.uuid'],
                include,
                having,
                where,
                ...paginate
            })
        ]);

        const apartments = {
            count: total,
            rows: data
        };
        return paginatedResponse(apartments);
    }

    static async createApartment(data, ctx) {
        return await ctx.models.Apartment.create({...data, owner: ctx.user.uuid});
    }

    static async updateApartment({id, ...data}, ctx) {
        const apartment = await this.getApartment(id, ctx);
        return apartment.update(data);
    }

    static async deleteApartment(id, ctx) {
        const apartment = await this.getApartment(id, ctx);
        return apartment.destroy();
    }

    static async markFavorite(apartment, ctx) {
        const _apartment = await this.getApartment(apartment, ctx);
        const favorite = await ctx.models.Favorite.create({apartment: apartment, user: ctx.user.uuid});
        return _apartment
    }

    static async getFavorites(ctx) {
        return await ctx.models.Favorite.findAll({
            where: {user: ctx.user.uuid}
        });
    }

    static async removeFavorite(apartment, ctx) {
        const _apartment = await this.getApartment(apartment, ctx);
        const favorite = await ctx.models.Favorite.findOne({where: {apartment: apartment, user: ctx.user.uuid}});
        await favorite.destroy();
        return _apartment
    }

    /*
     *   Room methods
     */

    static async getRoom(id, ctx) {
        const room = await ctx.models.Room.findOne({where: {uuid: id}});
        if (!room) throw new Error('Room not found');
        return room
    }

    static async getRooms(id, ctx) {
        return await ctx.models.Room.findAll({where: {apartment: id}});
    }

    static async createRoom(data, ctx) {
        return await ctx.models.Room.create({...data});
    }

    static async updateRoom({id, ...data}, ctx) {
        const room = await this.getRoom(id, ctx);
        return room.update(data);
    }

    static async deleteRoom(id, ctx) {
        const room = await this.getRoom(id, ctx);
        return room.destroy();
    }


}
