import express from "express";
import morgan from "morgan";

// create defaul troles
import { createRoles } from "./libs/setup";
// required routes
import productsRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";

const createApp = () => {
  const app = express();
  createRoles();

  // middleware
  app.use(express.json());
  app.use(morgan("dev"));

  app.set("port", 3000);

  // routes
  app.use("/api/products", productsRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/auth", authRoutes);

  return app;
};

export default createApp;
