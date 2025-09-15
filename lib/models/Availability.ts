import { Schema, model, models } from "mongoose";

const AvailabilitySchema = new Schema({
  available: { type: Boolean, required: true, default: false },
});

export default models.Availability || model("Availability", AvailabilitySchema);
