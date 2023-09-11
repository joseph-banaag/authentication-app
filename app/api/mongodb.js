import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://admin:vNzI7rBi3XUr0XnA@cluster0.pfvkrvb.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(uri);
if (uri !== "" || uri !== undefined || uri !== null) {
  console.log("Client connection is ready");
}

export default async function connectToDb() {
  if (!client.isConnected()) {
    try {
      await client.connect();
      console.log("You are connected to the database")
    } catch (error) {
      throw new Error(
        `There was an error connecting to the database. Error: ${error}`
      );
    }
  }
  
}
