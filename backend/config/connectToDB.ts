import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
    console.log("Connected To DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
