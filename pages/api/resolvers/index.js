import { scalarMutation, scalarQuery } from "./scalar";
import { rootMutation, rootQuery } from "./root";
import { customDate, Image } from "./customScalar";
import { enumQuery, enumMutation, enumShare } from "./enum";
import { unionsMutation, unionsQuery, unionsShare } from "./unions";
import {
  dataSourceQuery,
  dataSourceMutation,
  dataSourceShare,
} from "./dataSources";
import {
  directivesMutation,
  directivesQuery,
  directivesShare,
} from "./directives";
import {
  interfacesMutation,
  interfacesQuery,
  interfacesShare,
} from "./interfaces";
import { uploadQuery, uploadMutation } from "./upload";
import {
  subScriptionMutation,
  subScriptionQuery,
  subScriptionShare,
} from "./subScription";
import { mockShare } from "./mock";

export default {
  // Image: Image,
  // Date: customDate,
  ...enumShare,
  // ...unionsShare,
  // ...interfacesShare,
  // ...directivesShare,
  // ...dataSourceShare,
  // ...subScriptionShare,
  ...mockShare,
  Query: {
    // ...rootQuery,
    // ...scalarQuery,
    ...enumQuery,
    // ...unionsQuery,
    // ...interfacesQuery,
    // ...directivesQuery,
    // ...dataSourceQuery,
    // ...uploadQuery,
    // ...subScriptionQuery,
  },

  Mutation: {
    // ...rootMutation,
    // ...scalarMutation,
    ...enumMutation,
    // ...unionsMutation,
    // ...interfacesMutation,
    // ...directivesMutation,
    // ...dataSourceMutation,
    // ...uploadMutation,
    // ...subScriptionMutation,
  },
};
