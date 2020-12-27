import User from "../models/user";
import Author from "../models/author";
import Book from "../models/book";

export const unionsQuery = {
  search: async (_, { id }) => {
    const authorRecord = await Author.findById(id);
    const bookRecord = await Book.findById(id);
    if (authorRecord) {
      let author = await Author.findById(id).populate("books");
      return {
        __typename: "Author",
        ...author._doc,
      };
    }
    if (bookRecord) {
      let book = await Book.findById(id).populate("author");

      return {
        __typename: "Book",
        ...book._doc,
      };
    }
  },
  searchUser: async (_, { id }) => {
    const userRecord = await User.findById(id);
    if (userRecord) {
      return {
        __typename: "User",
        ...userRecord._doc,
      };
    }
    return {
      __typename: "UserNotFoundError",
      message: `The user with the id ${id} does not exist.`,
    };
  },
};
export const unionsMutation = {
  userRegister: async (_, { input }) => {
    const newUser = await User(input);
    if (newUser) {
      newUser.save();
      return {
        __typename: "UserRegisterResultSuccess",
        user: { ...newUser._doc },
      };
    }
    return {
      __typename: "UserRegisterInvalidInput",
      message: "user register Error",
      loginErrorMessage: "login error",
      emailErrorMessage: "email error",
      passwordErrorMessage: "password error",
    };
  },
};

export const unionsShare = {
  // Result: {
  //   __resolveType(obj, context, info) {
  //     if (obj.name) {
  //       return "Author";
  //     }
  //     if (obj.title) {
  //       return "Book";
  //     }
  //     return null;
  //   },
  // },
};
