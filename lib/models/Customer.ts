import mongoose from "mongoose";

const MeasurementsSchema = new mongoose.Schema(
  {
    bust: { type: String },
    roundUnderBust: { type: String },
    waist: { type: String },
    shoulderToUnderBust: { type: String },
    halfLength: { type: String },
    bustPoint: { type: String },
    shoulder: { type: String },
    roundSleeve: { type: String },
    sleeveLength: { type: String },
    blouseLength: { type: String },
    hips: { type: String },
    skirtLength: { type: String },
    skirtWaist: { type: String },
    fullGownLength: { type: String },
    shortGownLength: { type: String },
    trouserLength: { type: String },
    laps: { type: String },
    knee: { type: String },
    ankle: { type: String },
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

if (mongoose.models && mongoose.models.Customer) {
  delete mongoose.models.Customer;
}
export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
