import { GraphQLNonNull, GraphQLString } from 'graphql';

import userType from "./type.js";
import User from "./model.js";

export default {
    userCreate: {
        type: userType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async (_, args) => {
            const newUser = new User(args);
            await newUser.save();

            newUser.password = null;
            return newUser; 
        }
    }
}