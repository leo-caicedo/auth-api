// models
import User from "../models/User";

export const singUp = async (username, email, password) => {
  const userCreated = await new User({
    username,
    email,
    password: User.encryptPassword(password),
  });
  await userCreated.save();

  return userCreated;
};
export const singIn = async () => {};
