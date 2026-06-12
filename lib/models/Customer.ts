import mongoose from "mongoose";

const MeasurementsSchema = new mongoose.Schema(
  {
    bust: { type: Number },
    roundUnderBust: { type: Number },
    waist: { type: Number },
    shoulderToUnderBust: { type: Number },
    halfLength: { type: Number },
    bustPoint: { type: Number },
    shoulder: { type: Number },
    roundSleeve: { type: Number },
    sleeveLength: { type: Number },
    blouseLength: { type: Number },
    hips: { type: Number },
    skirtLength: { type: Number },
    skirtWaist: { type: Number },
    fullGownLength: { type: Number },
    shortGownLength: { type: Number },
    trouserLength: { type: Number },
    laps: { type: Number },
    knee: { type: Number },
    ankle: { type: Number },
  },
  { _id: false }
);

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    measurements: { type: MeasurementsSchema, default: () => ({}) },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
