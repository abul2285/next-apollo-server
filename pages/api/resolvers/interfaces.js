import { employee } from "../data/db";

export const interfacesQuery = {
  allEmployees: async (_, args) => {
    return employee;
  },
};
export const interfacesMutation = {
  addEmployee: (_, { input }) => {
    employee.push(input);
    return {
      id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
    };
  },
};
export const interfacesShare = {
  Employee: {
    __resolveType: (parent) => {
      if (parent.assignment) {
        return "Bartender";
      } else if (parent.yearsExperience) {
        return "LiftOperator";
      } else if (parent.certified) {
        return "SkiPatrol";
      } else {
        return "Instructor";
      }
    },
  },
};
