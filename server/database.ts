const MONGO_URI = process.env.MONGO_URI;

import { MongoClient, ServerApiVersion } from "mongodb";
//const uri ="mongodb+srv://nguyenkenneth:ZCazpj9SX3rhZlMF@melo.4nsbhkn.mongodb.net/?retryWrites=true&w=majority";

// if (!MONGO_URI) {
//   throw new Error("The MONGO_URI environment variable is not set.");
// }
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGO_URI || "", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit the process if unable to connect
  }
}
// run().catch(console.dir);

export { client, connect };
