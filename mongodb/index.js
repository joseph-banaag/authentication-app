const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://admin:vNzI7rBi3XUr0XnA@cluster0.pfvkrvb.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("test");
    const userInfo = database.collection("sample_users");

    // Query for a movie that has the title 'Back to the Future'
    const query = { name: "Joseph Banaag" };
    const user_name = await userInfo.findOne(query);

    console.log(user_name);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
