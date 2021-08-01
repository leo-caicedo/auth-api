import { Router } from "express";

const router = Router();

// controller
import * as productsCtrl from "../controllers/products.controller";

router.get("/", (req, res, next) => {
  // get products
});

router.get("/:id", (req, res, next) => {
  // get product
});

router.post("/:id", (req, res, next) => {
  // get product
});

router.put("/:id", (req, res, next) => {
  // get product
});

router.delete("/:id", (req, res, next) => {
  // get product
});

export default router;
