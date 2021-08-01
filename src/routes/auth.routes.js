import { Router } from "express";

const router = Router();

// controller
import * as authCtrl from "../controllers/auth.controller";

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const userCreated = await authCtrl.signUp(username, email, password);
    res.status(201).json({ token: userCreated });
  } catch (err) {
    next(err);
  }
});

router.post("/signin", async (req, res, next) => {});

export default router;
