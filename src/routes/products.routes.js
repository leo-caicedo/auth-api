import { Router } from "express";

const router = Router();

// controller
import * as productsCtrl from "../controllers/products.controller";

router.get("/", async (req, res, next) => {
  try {
    const products = await productsCtrl.getProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await productsCtrl.getProduct(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { body: data } = req;

  try {
    const productCreated = await productsCtrl.createProduct(data);
    res.status(201).json(productCreated);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body: data } = req;

  try {
    const productUpdated = await productsCtrl.updateProduct(id, data);
    res.json(productUpdated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const productRemoved = await productsCtrl.deleteProduct(id);
    res.send(productRemoved);
  } catch (err) {
    next(err);
  }
});

export default router;
