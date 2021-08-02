import jwt from "jsonwebtoken";

// models
import User from "../models/User";
import Role from "../models/Role";

import config from "../config";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "No token provide" });

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });
    next();
  } catch (err) {
    next(err);
  }
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);

  try {
    const roles = await Role.find({ _id: { $in: user.roles } });
    const moderator = roles.filter((role) => {
      return role.name === "moderator" || role.name === "admin"; // un admin puede tambien tener acceso
    });
    if (moderator.length < 1)
      return res.status(403).json({ message: "You're not authorized" });

    next();
  } catch (err) {
    next(err);
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);

  try {
    const roles = await Role.find({ _id: { $in: user.roles } });
    const admin = roles.filter((role) => role.name === "admin");
    if (admin.length < 1)
      return res.status(403).json({ message: "You're not authorized" });

    next();
  } catch (err) {
    next(err);
  }
};
