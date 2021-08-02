// models
import User from "../models/User";

export const getUsers = async () => {
  const users = await User.find();

  return users;
};

export const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  return user;
};

export const createUser = async (data) => {
  const userCreated = new User(data);
  await userCreated.save();

  return userCreated;
};

export const updateUser = async (id, data) => {
  const userUpdated = await User.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!userUpdated) throw new Error("User not found");

  return userUpdated;
};

export const deleteUser = async (id) => {
  const userRemoved = await User.findByIdAndDelete(id);
  if (!userRemoved) throw new Error("User not found");

  return true;
};
