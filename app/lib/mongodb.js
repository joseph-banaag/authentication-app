import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI;

if (uri !== "" || uri !== undefined || uri !== null) {
  console.log("Client connection is ready");
}

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectToDB = async () => {
  try {
    console.log("Establishing connection...")
    await client.connect();
    console.log("You are connected to the database");
  } catch (error) {
    throw new Error(
      `There was an error connecting to the database. Error: ${error}`
    );
  }
};

export default connectToDB;
