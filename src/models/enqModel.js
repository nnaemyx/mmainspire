const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
if (!mongoose.models.Enquiry) {
  const enquirySchema = Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "Submitted",
        enum: ["Submitted", "Contacted", "In Progress", "Resolved"],
      },
    },
    {
      timestamps: true,
    }
  );
  mongoose.model("Enquiry", enquirySchema);
}

module.exports = mongoose.model("Enquiry");
