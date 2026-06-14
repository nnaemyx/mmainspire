import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin", enum: ["admin"] },
    permissions: { type: [String], default: ["orders"] },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.Admin) {
  delete mongoose.models.Admin;
}
export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
