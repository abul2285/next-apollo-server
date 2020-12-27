import { scalarMutation, scalarQuery } from "./scalar";
import { rootMutation, rootQuery } from "./root";
import { customDate, Image } from "./customScalar";
import { enumQuery, enumMutation, enumShare } from "./enum";
import { unionsMutation, unionsQuery, unionsShare } from "./unions";

export default {
  // Image: Image,
  // Date: customDate,
  // ...enumShare,
  // ...unionsShare,
  Query: {
    // ...rootQuery,
    // ...scalarQuery,
    // ...enumQuery,
    ...unionsQuery,
  },
  Mutation: {
    // ...rootMutation,
    // ...scalarMutation,
    // ...enumMutation,
    ...unionsMutation,
  },
};
