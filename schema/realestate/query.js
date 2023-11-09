import { GraphQLList } from 'graphql';

import realestateType from './type.js';
import Realestate from "./model.js";

export default {
    realestates: {
        type: new GraphQLList(realestateType),
        resolve: async () => await Realestate.find()
    }
}