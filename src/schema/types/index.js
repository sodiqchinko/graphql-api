import {mergeTypeDefs} from '@graphql-tools/merge';
import {authDirectiveTypeDefs} from "./directives/authenticated";
import userType from './userType';
import authType from './authType';
import apartmentType from './apartmentType';

const types = [
    authDirectiveTypeDefs,
    userType,
    authType,
    apartmentType,
];

export default mergeTypeDefs(types);
