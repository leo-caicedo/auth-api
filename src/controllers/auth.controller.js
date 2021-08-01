import jwt from "jsonwebtoken";

import config from "../config";
// models
import User from "../models/User";

export const signUp = async (username, email, password, roles) => {
  const userCreated = await new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  // roles
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    userCreated.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOnde({ name: "user" });
    userCreated.roles = [role._id];
  }

  // token
  await userCreated.save();
  const token = jwt.sign({ id: userCreated._id }, config.SECRET, {
    expiresIn: 3600, // one hour
  });

  return token;
};
export const signIn = async () => {};
