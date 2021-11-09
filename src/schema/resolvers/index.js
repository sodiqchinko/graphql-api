import {mergeResolvers} from '@graphql-tools/merge';
import userResolver from './userResolver';
import authResolver from './authResolver';
import apartmentResolver from './apartmentResolver';

const resolvers = [
    userResolver,
    authResolver,
    apartmentResolver,
];

export default mergeResolvers(resolvers);
