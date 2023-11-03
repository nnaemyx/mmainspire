import Enquiry from "@/models/enqModel";
import { connectDB } from "@/libs/ConnectDB";
import initMiddleware from "@/utils/init-Middleware";
import Cors from "cors";

const cors = initMiddleware(
  Cors({
    // Set allowed origins based on your requirements
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const mongoose = require("mongoose");

const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("This id is not valid or not found");
};

async function handler(req, res) {
  if (req.method === "POST") {
    await cors(req, res);
    try {
      await connectDB();
      const newEnquiry = await Enquiry.create(req.body);
      res.json(newEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  } else if (req.method === "GET") {
    if (req.query.id) {
      // Handle getting a specific enquiry by ID
      const { id } = req.query;
      validateMongoDbId(id);
      try {
        const getaEnquiry = await Enquiry.findById(id);
        res.json(getaEnquiry);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      // Handle getting all enquiries
      try {
        const getallEnquiry = await Enquiry.find();
        res.json(getallEnquiry);
      } catch (error) {
        throw new Error(error);
      }
    }
  } else if (req.method === "PUT") {
    // Handle updating an enquiry
    const { id } = req.query;
    validateMongoDbId(id);
    try {
      await connectDB();
      const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  } else if (req.method === "DELETE") {
    // Handle deleting an enquiry
    const { id } = req.query;
    validateMongoDbId(id);
    try {
      await connectDB();
      const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
      res.json(deletedEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default handler;
