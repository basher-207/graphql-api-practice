import { GraphQLList } from 'graphql';

import userType from "./type.js";
import User from "./model.js";

export default { 
    users: {
        type: new GraphQLList(userType),
        resolve: async () => await User.find()
    }
}