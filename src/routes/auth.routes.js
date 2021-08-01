import { Router } from "express";

const router = Router();

// controller
import * as authCtrl from "../controllers/auth.controller";

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
});
router.post("/signin", async (req, res, next) => {});

export default router;
