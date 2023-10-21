import Order from "@/models/orderModel";
import User from "@/models/userModel";
import Cart from "@/models/cartModel";
import Product from "@/models/productModel";
import uniqid from "uniqid";
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
      const { COD, couponApplied } = req.body;
      const { _id } = req.user;
      validateMongoDbId(_id);

      if (!COD) throw new Error("Create cash order failed");

      await connectDB();
      const user = await User.findById(_id);
      let userCart = await Cart.findOne({ orderby: user._id });
      let finalAmount = 0;

      if (couponApplied && userCart.totalAfterDiscount) {
        finalAmount = userCart.totalAfterDiscount;
      } else {
        finalAmount = userCart.cartTotal;
      }

      let newOrder = await new Order({
        products: userCart.products,
        paymentIntent: {
          id: uniqid(),
          method: "COD",
          amount: finalAmount,
          status: "Cash on Delivery",
          created: Date.now(),
          currency: "usd",
        },
        orderby: user._id,
        orderStatus: "Cash on Delivery",
      }).save();

      let update = userCart.products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: -item.count, sold: +item.count } },
          },
        };
      });

      const updated = await Product.bulkWrite(update, {});
      res.json({ message: "success" });
    } catch (error) {
      throw new Error(error);
    }
  } else if (req.method === "GET") {
    if (req.query.id) {
      // Handle getting a specific order by ID
      const { id } = req.query;
      validateMongoDbId(id);
      try {
        const getOrder = await Order.findById(id)
          .populate("products.product")
          .populate("orderby")
          .exec();
        res.json(getOrder);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      // Handle getting all orders
      try {
        const allOrders = await Order.find()
          .populate("products.product")
          .populate("orderby")
          .exec();
        res.json(allOrders);
      } catch (error) {
        throw new Error(error);
      }
    }
  } else if (req.method === "PUT") {
    // Handle updating an order's status
    const { status } = req.body;
    const { id } = req.query;
    validateMongoDbId(id);
    try {
      await connectDB();
      const updatedOrderStatus = await Order.findByIdAndUpdate(
        id,
        {
          orderStatus: status,
          paymentIntent: {
            status: status,
          },
        },
        { new: true }
      );
      res.json(updatedOrderStatus);
    } catch (error) {
      throw new Error(error);
    }
  } else if (req.method === "DELETE") {
    // Handle deleting an order
    const { id } = req.query;
    validateMongoDbId(id);
    try {
      await connectDB();
      const deletedOrder = await Order.findByIdAndDelete(id);
      res.json(deletedOrder);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default handler;
