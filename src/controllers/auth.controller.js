import jwt from "jsonwebtoken";

import config from "../config";
// models
import User from "../models/User";
import Role from "../models/Role";

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
    const role = await Role.findOne({ name: "user" });
    userCreated.roles = [role._id];
  }

  await userCreated.save();

  // token
  //await userCreated.save();
  //const token = jwt.sign({ id: userCreated._id }, config.SECRET, {
  //expiresIn: 3600, // one hour
  //});

  return userCreated.username;
};

export const signIn = async (email, password) => {
  // validation
  const foundUser = await User.findOne({ email }).populate("roles");
  if (!foundUser) throw new Error("Invalid Credential");

  const matchPassword = await User.validatePassword(
    password,
    foundUser.password
  );
  if (!matchPassword) throw new Error("Invalid Credential");

  // token
  const token = jwt.sign({ id: foundUser._id }, config.SECRET, {
    expiresIn: 8600,
  });

  return {
    message: `Welcome ${foundUser.username} :)`,
    token,
  };
};
