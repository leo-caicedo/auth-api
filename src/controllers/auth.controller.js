import jwt from "jsonwebtoken";

import config from "../config";
// models
import User from "../models/User";

export const signUp = async (username, email, password) => {
  const userCreated = await new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });
  await userCreated.save();
  const token = jwt.sign({ id: userCreated._id }, config.SECRET, {
    expiresIn: 3600, // one hour
  });

  return token;
};
export const signIn = async () => {};
