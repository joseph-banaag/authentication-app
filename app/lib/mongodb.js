import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("You are connected to the database");
    }
  } catch (error) {
    throw new Error(
      `There was an error connecting to the database. Error: ${error}`
    );
  }
};

export default connectToDB;
