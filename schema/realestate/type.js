import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import userType from "../user/type.js";

import User from "../user/model.js";

export default new GraphQLObjectType({
    name: "realestateType",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        owner: { 
            type: new GraphQLNonNull(userType),
            resolve: async parent => await User.findById(parent.owner)
        }
    })
});