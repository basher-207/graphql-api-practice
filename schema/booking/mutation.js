import { GraphQLID, GraphQLNonNull } from 'graphql';

import bookingType from "./type.js";
import Booking from "./model.js";

export default {
    bookingCreate: {
        type: bookingType,
        args: {
            realestateId: { type: new GraphQLNonNull(GraphQLID) },
            userId: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async (_, args) => {
            const newBooking = new Booking({ realestate: args.realestateId, user: args.userId });
            await newBooking.save();
            return newBooking;
        }
    },
    bookingDelete: {
        type: bookingType,
        args: {
            bookingId: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: async (_, args) => await Booking.findByIdAndDelete(args.bookingId)
    }
}