import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

if (uri !== "" || uri !== undefined || uri !== null) {
  console.log("Client connection is ready");
}

const client = new MongoClient(uri);

const connectToDB = async () => {
  try {
    await client.connect();
    console.log("You are connected to the database");
  } catch (error) {
    throw new Error(
      `There was an error connecting to the database. Error: ${error}`
    );
  }
};

export default connectToDB;
