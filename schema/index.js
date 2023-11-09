import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { userQueries, userMutations } from './user/index.js';
import { realestateQueries, realestateMutations } from './realestate/index.js';
import { bookingQueries, bookingMutations } from './booking/index.js';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            ...userQueries,
            ...realestateQueries,
            ...bookingQueries
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            ...userMutations,
            ...realestateMutations,
            ...bookingMutations
        }
    })
});