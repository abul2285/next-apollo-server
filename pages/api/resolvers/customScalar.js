const { GraphQLScalarType, Kind } = require("graphql");
import isImage from "./isImage";

export const Image = new GraphQLScalarType({
  name: "Image",
  description: "An Image Scalar",
  serialize: (value) => {
    return isImage(value);
  },
});

export const customDate = new GraphQLScalarType({
  name: "Date",
  description: "Custom date scalar",
  parseValue(value) {
    return value;
  },
  serialize(value) {
    return new Date(Number(value));
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },
});
