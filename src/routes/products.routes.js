import { Router } from "express";

const router = Router();

// controller
import * as productsCtrl from "../controllers/products.controller";

// middleware
import { authJwt } from "../middleware";

router.get("/", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const products = await productsCtrl.getProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", [authJwt.verifyToken], async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await productsCtrl.getProduct(id);
    res.json(product);
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
      const productCreated = await productsCtrl.createProduct(data);
      res.status(201).json(productCreated);
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
      const productUpdated = await productsCtrl.updateProduct(id, data);
      res.json(productUpdated);
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
      await productsCtrl.deleteProduct(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
