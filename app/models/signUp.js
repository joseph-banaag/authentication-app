const addOne = async () => {
  try {
    const db = client.db("active_users");
    const collection = db.collection("user_information");

    const currentDate = new Date();

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
export default addOne;
