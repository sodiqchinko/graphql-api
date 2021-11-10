import {AuthenticationError} from "apollo-server";
import {defaultFieldResolver} from "graphql";

const {mapSchema, getDirective, MapperKind} = require('@graphql-tools/utils');

export const authDirectiveTypeDefs = `directive @auth on FIELD_DEFINITION`;

export const authDirectiveTransformer = (schema, directiveName) => {
    return mapSchema(schema, {

        // Executes once for each object field in the schema
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {

            // Check whether this field has the specified directive
            const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

            if (authDirective) {
                // Get this field's original resolver
                const {resolve = defaultFieldResolver} = fieldConfig;

                // Replace the original resolver with a function that *first* calls
                fieldConfig.resolve = async function (source, args, context, info) {
                    if (!context.user) {
                        throw new AuthenticationError(`Unauthorized access`);
                    }
                    return resolve(source, args, context, info);
                }
                return fieldConfig;
            }
        }
    });
}


