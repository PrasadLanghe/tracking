import Tracking from "./tracking.model.js";
import { generateTrackingId } from "./tracking.service.js";

export const createTracking = async (req, res) => {
  try {
    const { pickupLocation, dropLocation } = req.body;

    const tracking = await Tracking.create({
      trackingId: generateTrackingId(),
      pickupLocation,
      dropLocation,
    });

    res.status(201).json(tracking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLiveLocation = async (req, res) => {
  const { trackingId, lat, lng } = req.body;

  const tracking = await Tracking.findOneAndUpdate(
    { trackingId },
    {
      currentLocation: { lat, lng },
      status: "IN_TRANSIT",
    },
    { new: true }
  );

  const io = req.app.get("io");
  io.to(trackingId).emit("locationUpdate", { lat, lng });

  res.json({ success: true });
};
