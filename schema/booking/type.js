import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import dateType from "../utils/dataTypes.js";
import userType from "../user/type.js";
import realestateType from "../realestate/type.js";

import User from "../user/model.js";
import Realestate from "../realestate/model.js";

export default new GraphQLObjectType({
    name: "bookingType",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        createdAt: { type: new GraphQLNonNull(dateType) }, 
        updatedAt: { type: new GraphQLNonNull(dateType) }, 
        from: { type: new GraphQLNonNull(dateType) }, 
        to: { type: new GraphQLNonNull(dateType) }, 
        user: { 
            type: new GraphQLNonNull(userType),
            resolve: async parent => await User.findById(parent.user)
        },
        realestate: { 
            type: new GraphQLNonNull(realestateType),
            resolve: async parent => await Realestate.findById(parent.realestate)
        }
    })
});