import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';

// import schema from './schema/index.js';


const app = express();
// your code here


////////////////////////
import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import User from "./schema/user/model.js";
import Realestate from "./schema/realestate/model.js";
import Booking from "./schema/booking/model.js";

const userType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        ownedRealestates : { 
            type: GraphQLList(realestateType),
            resolve: async (parent) => {
                const realestateOwned = await Realestate.find({owner: parent._id});
                return realestateOwned.length !== 0 ? realestateOwned : null
            }
        }
    })
});

const realestateType = new GraphQLObjectType({
    name: "realestateType",
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        owner: { 
            type: GraphQLNonNull(userType),
            resolve: async (parent) => await User.findById(parent.owner)
        }
    })
});

const bookingType = new GraphQLObjectType({
    name: "bookingType",
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        createdAt: { type: GraphQLNonNull(GraphQLString) },
        updatedAt: { type: GraphQLNonNull(GraphQLString) },
        from: { type: GraphQLNonNull(GraphQLString) },
        to: { type: GraphQLNonNull(GraphQLString) },
        user: { 
            type: GraphQLNonNull(userType),
            resolve: async (parent) => await User.findById(parent.user)
        },
        realestate: { 
            type: GraphQLNonNull(realestateType),
            resolve: async (parent) => await Realestate.findById(parent.realestate)
        }
    })
});


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            users: {
                type: new GraphQLList(userType),
                resolve: async () => await User.find()
            },
            realestates: {
                type: new GraphQLList(realestateType),
                resolve: async () => await Realestate.find()
            },
            bookings: {
                type: new GraphQLList(bookingType),
                resolve: async () => await Booking.find()
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            userCreate: {
                type: userType,
                args: {
                    email: { type: GraphQLNonNull(GraphQLString) },
                    password: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: async (parent, args) => {
                    const newUser = new User(args);
                    await newUser.save();
                    return newUser;
                }
            },
            realestateCreate: {
                type: realestateType,
                args: {
                    address: { type: GraphQLNonNull(GraphQLString) },
                    price: { type: GraphQLNonNull(GraphQLInt) },
                    title: { type: GraphQLNonNull(GraphQLString) },
                    owner: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: async (parent, args) => {
                    const newRealestate = new Realestate(args);
                    await newRealestate.save();
                    return newRealestate;
                }
            },
            bookingCreate: {
                type: bookingType,
                args: {
                    realestateId: { type: GraphQLNonNull(GraphQLID) },
                    userId: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: async (parent, args) => {
                    const newBooking = new Booking({ realestate: args.realestateId, user: args.userId });
                    await newBooking.save();
                    return newBooking;
                }
            },
            bookingDelete: {
                type: bookingType,
                args: {
                    bookingId: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: async (parent, args) => await Booking.findByIdAndDelete(args.bookingId)
            }
        }
    })
});
////////////////////////



app.use("/", createHandler({ schema }));

export default app;
