// models
import Product from "../models/Product";

export const getProducts = async () => {
  const products = await Product.find();

  return products;
};

export const getProduct = async (id) => {
  const product = await Product.findById(id);

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

  return productUpdated;
};

export const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);

  return true;
};
