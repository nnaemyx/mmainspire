import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    collection: { type: String },
    eventDate: { type: String },
    message: { type: String, required: true },
    status: { type: String, default: "New", enum: ["New", "Responded", "Closed"] },
    interestedItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Clothing" },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
