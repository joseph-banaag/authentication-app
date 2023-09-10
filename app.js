const { MongoClient } = require("mongodb");
const uri = require("./db_uri");

console.log(`You are using the "${uri}" cluster`);

// connection to the database
const client = new MongoClient(uri);
const dbName = "sample_users";
const collName = "user_information";

const connectToDb = async () => {
  try {
    await client.connect();
    console.log(`You are currently connected to the "${dbName}" database`);
  } catch (error) {
    throw new Error(
      `Error when connecting to the database. Error code: ${error}`
    );
  }
};

const listDatabases = async () => {
  try {
    const dbs = await client.db().admin().listDatabases();
    console.log("Here is the list of databases within your cluster");
    console.table(dbs.databases);
  } catch (error) {
    throw new Error(`There was an error connecting to the database: ${error}`);
  }
};

// * this is the main function that will run all the code above
const main = async () => {
  try {
    // this will check the db connection
    await connectToDb();

    await listDatabases();

    // below is another way of coding how to display the list of databases from the client
    /* 
    const dbs = await client.db().admin().listDatabases();
    console.log("Here is the list of databases within your cluster");
    console.table(dbs.databases);

    */
  } catch (error) {
    console.error(`There was an error connecting to the database. ${error}`);
  } finally {
    await client.close();
  }
};
main();
