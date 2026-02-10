import express from "express";
import {
  createTracking,
  updateLiveLocation,
} from "./tracking.controller.js";

const router = express.Router();

router.post("/create", createTracking);
router.post("/location", updateLiveLocation);

export default router;
