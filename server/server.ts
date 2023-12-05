import dotenv from "dotenv";
dotenv.config();
import { client, connect } from "./database";
import express, { Request, Response, NextFunction, Express } from "express";
import cors from "cors";

const app: Express = express();
app.use(cors());

const PORT: number = 3000;
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}...`);
    });
  })
  .catch((err: Error) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/stores", async (req: Request, res: Response) => {
  try {
    const db = client.db("melo");
    const collection = db.collection("locations");
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

app.get("/menuItems", async (req: Request, res: Response) => {
  try {
    const db = client.db("melo");
    const menuItemsCollection = db.collection("menuItems");

    // Fetch all documents from the collection
    const items = await menuItemsCollection.find().toArray();

    res.json(items);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

// Given a store ID, get the menu items for that store in the menuItems collection and return it
app.get("/store/:storeId/menu", async (req: Request, res: Response) => {
  try {
    const storeId = parseInt(req.params.storeId);
    const db = client.db("melo");
    const storesCollection = db.collection("locations");
    const menuItemsCollection = db.collection("menuItems");

    // Find the store with the given id
    const store = await storesCollection.findOne({ id: storeId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Extract menu items ids
    const menuItemIds = store.menuItems;

    // Query menu items collection to get details of each menu item
    const menuItems = await menuItemsCollection
      .find({ id: { $in: menuItemIds } })
      .toArray();

    res.json(menuItems);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

/* ------ Catch all route handler for any requests to an unknown route ------ */
app.use((req: Request, res: Response) =>
  res.status(404).send("This is not the page you're looking for...")
);

/* ------------------------ Error handling middleware ----------------------- */
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  if (err instanceof Error) {
    // If err is an instance of Error, override the default message
    const errorObj = {
      ...defaultErr,
      message: err.message,
    };
    console.log(errorObj.log);
    return res.status(errorObj.status).json({ err: errorObj.message });
  } else {
    // If err is not an Error, use the default error object
    console.log(defaultErr.log);
    return res.status(defaultErr.status).json({ err: defaultErr.message });
  }
});

export default app;
