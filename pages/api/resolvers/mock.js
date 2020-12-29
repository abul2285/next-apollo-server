export const mockShare = {
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
