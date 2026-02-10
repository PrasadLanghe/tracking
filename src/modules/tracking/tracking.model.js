import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema(
  {
    trackingId: { type: String, unique: true },
    pickupLocation: {
      address: String,
      lat: Number,
      lng: Number,
    },
    dropLocation: {
      address: String,
      lat: Number,
      lng: Number,
    },
    currentLocation: {
      lat: Number,
      lng: Number,
    },
    status: {
      type: String,
      default: "CREATED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tracking", trackingSchema);
