import { GraphQLScalarType } from "graphql";

const naiveIsoDateRegex = /(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/;

export default new GraphQLScalarType({
    name: "DateTime",
    description: "Date type representing he date and time and has the next structure: YYYY-MM-DDTHH:MM:SS.000Z",
    parseValue: (value) => {
        if (!naiveIsoDateRegex.test(value)) {
          throw new Error('Invalid date format');
        }
        return new Date(value);
      },
      serialize: (value) => {
        return value.toISOString();
      }
});