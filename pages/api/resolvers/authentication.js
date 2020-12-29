import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import { AuthenticationError, UserInputError } from "apollo-server";

const requiredValue = (values) => {
  Object.entries(values).forEach(([name, value]) => {
    if (validator.isEmpty(value))
      throw new UserInputError(`${name} is required`);
  });
};

const requiredLength = (values) => {
  Object.entries(values).forEach(([name, value]) => {
    if (!validator.isLength(value[0], { min: value[1], max: value[2] }))
      throw new UserInputError(`${name} is to short`);
  });
};

const validateValue = ({ name, email, password, confirmPassword, preUser }) => {
  if (!validator.isEmail(email)) throw new UserInputError("email is not valid");
  if (preUser) throw new AuthenticationError("user already exist");
  requiredValue({ name, email, password });
  requiredLength({ name: [name, 3], password: [password, 6] });
  if (!validator.equals(password, confirmPassword))
    throw new UserInputError("password must match");
};

export const authenticationMutation = {
  login: async (_, { email, password }) => {
    if (!validator.isEmail(email))
      throw new UserInputError("email is not valid");
    const preUser = await User.findOne({ email });
    if (!preUser) throw new AuthenticationError("user not found");
    requiredValue({ email, password });
    let isValidUser = await bcrypt.compare(password, preUser.password);
    if (!isValidUser) throw new UserInputError("password is not matching");
    let token = await jwt.sign(
      { email: preUser.email, _id: preUser._id },
      "secret",
      {
        expiresIn: "1h",
      }
    );

    return { ...preUser._doc, token };
  },
  signup: async (_, { input }) => {
    const { name, email, password } = input;
    const preUser = await User.findOne({ email });

    validateValue({ ...input, preUser });

    let hashPassword = await bcrypt.hash(password, 8);
    const newUser = await User({ name, email, password: hashPassword });
    newUser.save();

    let token = jwt.sign({ email, _id: newUser._id }, "secret", {
      expiresIn: "1h",
    });

    return { ...newUser._doc, token };
  },

  logout: (_, __, { req, user }) => {
    // delete mongoose.connection.models["User"];
    // mark : I have to implement logout functionality
    return "logout successfull";
  },
};

export const authenticationShare = {
  // UserRegisterResult: {
  //   __resolveType: (parent) => {
  //     if (parent.nameErrorMessage) {
  //       return "UserRegisterInvalidInput";
  //     } else {
  //       return "UserRegisterResultSuccess";
  //     }
  //   },
  // },
};
