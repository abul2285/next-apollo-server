import jwt from "jsonwebtoken";

import User from "../models/user";

export const employee = [
  {
    id: "1",
    firstName: "Topher",
    lastName: "Saunders",
    assignment: "SUMMIT",
    supervisor: true,
    shift: 1,
  },
  {
    id: "11",
    firstName: "Matt",
    lastName: "Christie",
    level: 3,
    privateLessons: true,
  },
  {
    id: "21",
    firstName: "Shawni",
    lastName: "Horizon",
    yearsExperience: 1,
  },
  {
    id: "31",
    firstName: "Denise",
    lastName: "Lankman",
    certified: true,
    aviLevel: 3,
  },
];

const users = [
  {
    id: "1",
    token: "token-for-maurice-moss",
    firstName: "Maurice",
    lastName: "Moss",
    email: "maurice@moss.com",
    password: "abcdefg",
    role: "USER",
  },
  {
    id: "2",
    token: "token-for-roy-trenneman",
    firstName: "Roy",
    lastName: "Trenneman",
    email: "roy@trenneman.com",
    password: "imroy",
    role: "ADMIN",
  },
  {
    id: "3",
    token: "token-for-jen-barber",
    firstName: "Jen",
    lastName: "Barber",
    email: "jen@barber.com",
    password: "qwerty",
    role: "USER",
  },
];

const messages = [
  {
    id: "1",
    senderId: "2",
    receiverId: "3",
    text: "Hey Jen, how are you doing?",
  },
  {
    id: "2",
    senderId: "3",
    receiverId: "2",
    text: "Hi Roy, I'm doing great! How are you?",
  },
];
export const getUser = async (auth) => {
  if (!auth) throw new AuthenticationError("you must be logged in!");

  const token = auth.split("Bearer ")[1];
  if (!token) throw new AuthenticationError("you should provide a token!");

  const user = await jwt.verify(token, SECRET, (err, decoded) => {
    if (err) throw new AuthenticationError("invalid token!");
    return decoded;
  });
  return user;
};

export const getById = (id) => messages.find((message) => message.id === id);
