import express from "express";

const createApp = () => {
  const app = express();

  // middleware
  app.use(express.json());
  app.set("port", 3000);

  return app;
};

export default createApp;
