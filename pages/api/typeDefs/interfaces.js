import { gql } from "apollo-server";

export default gql`
  interface Employee {
    id: ID!
    firstName: String!
    lastName: String!
  }

  type Bartender implements Employee {
    id: ID!
    firstName: String!
    lastName: String!
    assignment: String!
    supervisor: Boolean!
    shift: Int!
  }

  type Instructor implements Employee {
    id: ID!
    firstName: String!
    lastName: String!
    level: Int!
    privateLessons: Boolean!
  }

  type LiftOperator implements Employee {
    id: ID!
    firstName: String!
    lastName: String!
    yearsExperience: Int!
  }

  type SkiPatrol implements Employee {
    id: ID!
    firstName: String!
    lastName: String!
    certified: Boolean!
    aviLevel: Int!
  }

  enum JobType {
    LIFTOPERATOR
    SKIPATROL
    INSTRUCTOR
    BARTENDER
  }

  input inputEmployee {
    id: ID!
    firstName: String!
    lastName: String!
    assignment: String
    supervisor: Boolean
    job: JobType
    shift: Int
    level: Int
    privateLessons: Boolean
    yearsExperience: Int
    certified: Boolean
    aviLevel: Int
  }

  extend type Query {
    allEmployees: [Employee!]!
    allBartenders: [Bartender!]!
    allInstructors: [Instructor!]!
    allLiftOperators: [LiftOperator!]!
    allSkiPatrol: [SkiPatrol!]!
  }

  extend type Mutation {
    addEmployee(input: inputEmployee): Employee!
  }
`;
