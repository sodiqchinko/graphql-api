import userService from "../../services/userService";

const resolvers = {
    Favorite: {
        user: (parent, args, ctx) => {
            return userService.getUser(parent.user, ctx)
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
