import authService from "../../services/authService";

const resolvers = {
    Mutation: {
        signUp: async (parent, args, ctx) => {
            return authService.signUp(args.input, ctx)
        },

        login: (parent, args, ctx) => {
            return authService.login(args, ctx)
        },
    },

};

export default resolvers;
