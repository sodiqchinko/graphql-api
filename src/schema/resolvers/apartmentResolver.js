import apartmentService from "../../services/apartmentService";

const resolvers = {
    Query: {
        apartment: (parent, args, ctx) => {
            return apartmentService.getApartment(args.id, ctx)
        },
        searchApartment: (parent, args, ctx) => {
            return apartmentService.searchApartment(args, ctx)
        },
    },
    User: {
        favoriteApartments: (parent, args, ctx) => {
            return apartmentService.getFavorites(ctx)
        },
    },
    Favorite: {
        apartment: (parent, args, ctx) => {
            return apartmentService.getApartment(parent.apartment, ctx)
        },
    },
    Apartment: {
        rooms: (parent, args, ctx) => {
            return apartmentService.getRooms(parent.uuid, ctx)
        },
        roomCount: (parent, args, ctx) => {
            return parent.dataValues.roomCount
        },
    },
    Mutation: {
        createApartment: async (parent, args, ctx) => {
            return apartmentService.createApartment(args.input, ctx)
        },

        updateApartment: (parent, args, ctx) => {
            return apartmentService.updateApartment(args.input, ctx)
        },

        deleteApartment: (parent, args, ctx) => {
            return apartmentService.deleteApartment(args.id, ctx)
        },

        markFavorite: (parent, args, ctx) => {
            return apartmentService.markFavorite(args.id, ctx)
        },

        removeFavorite: (parent, args, ctx) => {
            return apartmentService.removeFavorite(args.id, ctx)
        },
        createRoom: async (parent, args, ctx) => {
            return apartmentService.createRoom(args.input, ctx)
        },

        updateRoom: (parent, args, ctx) => {
            return apartmentService.updateRoom(args.input, ctx)
        },

        deleteRoom: (parent, args, ctx) => {
            return apartmentService.deleteRoom(args.id, ctx)
        },

    },


};
export default resolvers;
