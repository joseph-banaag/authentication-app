const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://admin:vNzI7rBi3XUr0XnA@cluster0.pfvkrvb.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("test"); // this will set the database
    const userInfo = database.collection("sample_users"); // this will set the collection

    const query = { name: "Joseph Banaag" }; //this will be the document to look for
    const user_name = await userInfo.findOne(query); // this will be the function to help the command work

    console.log(user_name); // this will display the result of the command
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

// todo: next step here: https://www.mongodb.com/docs/drivers/node/current/quick-start/next-steps/
//  https://www.mongodb.com/developer/languages/typescript/
