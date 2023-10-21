import Coupon from "@/models/couponModel";
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
      const newCoupon = await Coupon.create(req.body);
      res.json(newCoupon);
    } catch (error) {
      throw new Error(error);
    }
  } else if (req.method === "GET") {
    try {
      if (req.query.id) {
        // Handle getting a specific coupon by ID
        const { id } = req.query;
        validateMongoDbId(id);
        const getAcoupon = await Coupon.findById(id);
        res.json(getAcoupon);
      } else {
        // Handle getting all coupons
        const coupons = await Coupon.find();
        res.json(coupons);
      }
    } catch (error) {
      throw new Error(error);
    }
  } else if (req.method === "PUT") {
    // Handle updating a coupon
    const { id } = req.query;
    validateMongoDbId(id);
    try {
      await connectDB();
      const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatecoupon);
    } catch (error) {
      throw new Error(error);
    }
  } else if (req.method === "DELETE") {
    // Handle deleting a coupon
    const { id } = req.query;
    validateMongoDbId(id);
    try {
      await connectDB();
      const deletecoupon = await Coupon.findByIdAndDelete(id);
      res.json(deletecoupon);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default handler;
