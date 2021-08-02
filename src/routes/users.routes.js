import { Router } from "express";

const router = Router();

// controller
import * as usersCtrl from "../controllers/users.controller";

// middleware
import { authJwt } from "../middleware";

router.get("/", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const users = await usersCtrl.getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", [authJwt.verifyToken], async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await usersCtrl.getUser(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  async (req, res, next) => {
    const { body: data } = req;

    try {
      const userCreated = await usersCtrl.createUser(data);
      res.status(201).json(userCreated);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModerator],
  async (req, res, next) => {
    const { id } = req.params;
    const { body: data } = req;

    try {
      const userUpdated = await usersCtrl.updateUser(id, data);
      res.json(userUpdated);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (req, res, next) => {
    const { id } = req.params;

    try {
      await usersCtrl.deleteUser(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
