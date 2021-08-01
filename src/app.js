import express from "express";
import morgan from "morgan";

// required routes
import productsRoutes from "./routes/products.routes";
import apthRoutes from "./routes/auth.routes";

const createApp = () => {
  const app = express();

  // middleware
  app.use(express.json());
  app.use(morgan("dev"));

  app.set("port", 3000);

  // routes
  app.use("/api/products", productsRoutes);
  app.use("/api/auth", apthRoutes);

  return app;
};

export default createApp;
