import { MockList } from "apollo-server";
import casual from "casual";

casual.define("account", function ({ id, status, authType }) {
  return {
    id: id || casual.unix_time,
    authType: authType || "github-auth",
    email: casual.email,
    token: casual.uuid,
    archived: status === "ARCHIVED" ? true : false,
    disabled: status === "DISABLED" ? true : false,
    verified: status === "VERIFIED" ? true : false,
  };
});

casual.define("employee", function () {
  return {
    id: casual.unix_time,
    firstName: casual.first_name,
    lastName: casual.last_name,
  };
});

casual.define("bartender", () => ({
  ...casual.employee,
  assignment: "SUMMIT",
  supervisor: true,
  shift: casual.integer(0, 10),
}));

casual.define("instructor", () => ({
  ...casual.employee,
  level: casual.integer(1, 3),
  privateLessons: casual.boolean,
}));

casual.define("liftOperator", () => ({
  ...casual.employee,
  yearsExperience: casual.integer(0, 10),
}));

casual.define("skiPatrol", () => ({
  ...casual.employee,
  certified: true,
  aviLevel: casual.integer(0, 10),
}));

export default {
  Friend: () => ({
    name: casual.name,
    age: () => casual.integer(20, 30),
  }),

  Person: () => ({
    name: casual.name,
    age: () => casual.integer(20, 30),
    friends: () => new MockList(2),
    paginatedFriends: (parent, args, context, info) =>
      new MockList(args.numPages * 1),
  }),

  Query: () => ({
    people: () => new MockList([1, 3]),
    users: (_, { limit, authType, status }) =>
      new MockList(limit, () => {
        return {
          id: casual.unix_time,
          accounts: () =>
            new MockList(3, () => casual.account({ status, authType })),
          givenName: casual.name,
        };
      }),
    allEmployees: () => new MockList([5, 10]),
    allBartenders: () => new MockList([5, 10]),
    allSkiPatrol: () => new MockList([5, 10]),
  }),

  Bartender: () => casual.bartender,
  Instructor: () => casual.instructor,
  LiftOperator: () => casual.liftOperator,
  SkiPatrol: () => casual.skiPatrol,

  Mutation: () => ({
    updateAccount: (_, { input: { id, state } }) => {
      return casual.account({ id, status: state });
    },
  }),
};
