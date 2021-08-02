// models
import Product from "../models/Product";

export const getProducts = async () => {
  const products = await Product.find();

  return products;
};

export const getProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  return product;
};

export const createProduct = async (data) => {
  const productCreated = new Product(data);
  await productCreated.save();

  return productCreated;
};

export const updateProduct = async (id, data) => {
  const productUpdated = await Product.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!productUpdated) throw new Error("Product not found");

  return productUpdated;
};

export const deleteProduct = async (id) => {
  const productRemoved = await Product.findByIdAndDelete(id);
  if (!productRemoved) throw new Error("Product not found");

  return true;
};
