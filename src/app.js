import express from "express";
import cors from "cors";

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Health check */
app.get("/", (req, res) => {
  res.send("Live Tracking Backend Running 🚀");
});

/* Routes */
import trackingRoutes from "./modules/tracking/tracking.routes.js";
app.use("/api/tracking", trackingRoutes);

export default app;
