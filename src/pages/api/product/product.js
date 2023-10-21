import Product from "@/models/productModel";
import { connectDB } from "@/libs/ConnectDB";
import initMiddleware from "@/utils/init-Middleware";
import Cors from "cors";
import slugify from "slugify";

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
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const newProduct = await Product.create(req.body);
      res.json(newProduct);
    } catch (error) {
      throw new Error(error);
    }
  } else if (req.method === "GET") {
    if (req.query.id) {
      // Handle getting a specific product by ID
      const { id } = req.query;
      validateMongoDbId(id);
      try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      // Handle getting all products
      try {
        // Filtering
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
          /\b(gte|gt|lte|lt)\b/g,
          (match) => `$${match}`
        );

        let query = Product.find(JSON.parse(queryStr));

        // Sorting

        if (req.query.sort) {
          const sortBy = req.query.sort.split(",").join(" ");
          query = query.sort(sortBy);
        } else {
          query = query.sort("-createdAt");
        }

        // limiting the fields

        if (req.query.fields) {
          const fields = req.query.fields.split(",").join(" ");
          query = query.select(fields);
        } else {
          query = query.select("-__v");
        }

        // pagination

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
          const productCount = await Product.countDocuments();
          if (skip >= productCount)
            throw new Error("This Page does not exists");
        }
        const product = await query;
        res.json(product);
      } catch (error) {
        throw new Error(error);
      }
    }
  } else if (req.method === "PUT") {
    // Handle updating a product
    const { id } = req.query;
    validateMongoDbId(id);
    try {
      await connectDB();
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedProduct) {
        throw new Error("Product not found");
      }
      res.json(updatedProduct);
    } catch (error) {
      throw new Error(error);
    }
  } else if (req.method === "DELETE") {
    // Handle deleting a product
    const { id } = req.query;
    validateMongoDbId(id);
    try {
      await connectDB();
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new Error("Product not found");
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default handler;
