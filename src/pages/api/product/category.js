import Category from "@/models/categoryModel";
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
      const newCategory = await Category.create(req.body);
      res.json(newCategory);
    } catch (error) {
      throw new Error(error);
    }
  } else if (req.method === "GET") {
    if (req.query.id) {
      // Handle getting a specific category by ID
      const { id } = req.query;
      validateMongoDbId(id);
      try {
        const getaCategory = await Category.findById(id);
        res.json(getaCategory);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      // Handle getting all categories
      try {
        const getallCategory = await Category.find();
        res.json(getallCategory);
      } catch (error) {
        throw new Error(error);
      }
    }
  } else if (req.method === "PUT") {
    // Handle updating a category
    const { id } = req.query;
    validateMongoDbId(id);
    try {
      await connectDB();
      const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedCategory);
    } catch (error) {
      throw new Error(error);
    }
  } else if (req.method === "DELETE") {
    // Handle deleting a category
    const { id } = req.query;
    validateMongoDbId(id);
    try {
      await connectDB();
      const deletedCategory = await Category.findByIdAndDelete(id);
      res.json(deletedCategory);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default handler;
