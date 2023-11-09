import { GraphQLList } from 'graphql';

import bookingType from "./type.js";
import Booking from "./model.js";

export default {
    bookings: {
        type: new GraphQLList(bookingType),
        resolve: async () => await Booking.find()
    }
}