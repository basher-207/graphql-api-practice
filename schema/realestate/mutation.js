import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';

import realestateType from './type.js';
import Realestate from "./model.js";

export default {
    realestateCreate: {
        type: realestateType,
        args: {
            address: { type: new GraphQLNonNull(GraphQLString) },
            price: { type: new GraphQLNonNull(GraphQLInt) },
            title: { type: new GraphQLNonNull(GraphQLString) },
            owner: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async (_, args) => {
            const newRealestate = new Realestate(args);
            await newRealestate.save();
            return newRealestate;
        }
    }
}