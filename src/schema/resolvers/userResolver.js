import userService from "../../services/userService";

const resolvers = {
    Favorite: {
        user: (parent, args, ctx) => {
            return userService.getUser(parent.user, ctx)
        },
    },

    Apartment: {
        owner: (parent, args, ctx) => {
            return userService.getUser(parent.owner, ctx)
        },
    },

    Query: {
        users: async (parent, args, ctx) => {
            return userService.getUsers(args, ctx)
        },
        user: (parent, args) => {
            return userService.getUser(args.id, ctx)
        },
    },
};

export default resolvers;
