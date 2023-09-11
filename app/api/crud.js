const { MongoClient } = require("mongodb");
const uri = require("../api/db_uri");

console.log(uri);

if (uri !== "" || uri !== undefined || uri !== null) {
  console.log("Client connection is ready");
}

const client = new MongoClient(uri);

//* Connection to the database
const connectToDb = async () => {
  try {
    await client.connect();
    console.log("You are connected to the database");
  } catch (error) {
    throw new Error(`Error when connecting to the database: ${error}`);
  }
};

//* CREATE
const addOne = async () => {
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    // * for the current date
    const currentDate = new Date();
    // 2. Display the date and time in a custom format (e.g., YYYY-MM-DD HH:MM:SS).
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
      2,
      "0"
    )} ${String(currentDate.getHours()).padStart(2, "0")}:${String(
      currentDate.getMinutes()
    ).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}`;
    // console.log(formattedDate);
    // 3. Display the date in a more readable format (e.g., Month Day, Year).
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const creationDate = `${
      months[currentDate.getMonth()]
    } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    console.log(`A new document has been added to your database`);
    console.log(`A new account was added on: ${creationDate}`);
    // * end for the current date

    const email = "email@gmail.com";
    const user_name = "Ipoy_23";
    const password = "march_23,2020";

    const newDoc = {
      email: `${email}`,
      username: `${user_name}`,
      password: `${password}`,
      created_on: `${creationDate}`,
    };
    const result = await collection.insertOne(newDoc);
    console.log(`ID: ${result.insertedId}`);
    //   ${result.insertedId} this will get the id for the newly created account
  } catch (error) {
    throw new Error(
      `There was an error when adding a document to your database. Error: ${error}`
    );
  }
};

//* READ
const findOne = async () => {
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toFind = {
      password: "newpassword1",
    };

    // const toFind = {
    //   created_on: {$gt: "September 10, 2023"}
    // }

    const result = await collection.find(toFind).toArray(); // .toArray() method is important as it will throw an error if it is not present
    console.log("Here's what I found from your database:");
    console.log(result);
  } catch (error) {
    throw new Error(
      `There was an error when looking for a document from your database. Error: ${error}`
    );
  }
};

//* UPDATE
const updateOne = async () => {
  try {
    const dbName = "active_users";
    const collection = client.db(dbName).collection("user_information");

    const filter = {
      email: "email@email.com",
    };

    const toUpdate = {
      $set: {
        password: "new_password",
      },
    };

    const result = await collection.updateOne(filter, toUpdate);
    console.log(
      `Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)`
    );
  } catch (error) {
    throw new Error(
      `There was an error when updating a document from your database. Error: ${error}`
    );
  }
};

//* DELETE
const deleteOne = async () => {
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const toDelete = {
      username: "jose_23,",
    };

    const result = await collection.deleteOne(toDelete);
    if (result.deletedCount === 1) {
      console.log(`A document has been removed`);
    } else {
      console.log(`Document not found. Please check your {key: "value"}`);
    }
  } catch (error) {
    throw new Error(
      `There was an error when deleting a document from your database. Error: ${error}`
    );
  }
};

const main = async () => {
  try {
    await connectToDb();
    // await addOne();
    // await deleteOne();
    await findOne();
    // await updateOne();
    console.log("Closing the connection...");
  } catch (error) {
    throw new Error(
      `Alert! An error occurred when working with the database. Error: ${error}`
    );
  } finally {
    await client.close();
    console.log("Database connection is now closed!");
  }
};
main();
