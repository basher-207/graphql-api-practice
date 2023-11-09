import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import realestateType from "../realestate/type.js";

import Realestate from "../realestate/model.js";

export default new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
        ownedRealestates : { 
            type: new GraphQLList(realestateType),
            resolve: async parent => await Realestate.find({owner: parent._id})
        }
    })
});