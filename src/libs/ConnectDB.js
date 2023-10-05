import mongoose  from "mongoose";


if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
  
  const uri = process.env.MONGODB_URI;


export const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`Mongodb connected ${conn.connection}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };