// import path from 'path';
import express, { Request, Response, NextFunction, Express } from 'express';
import { client } from './database';
import Store from './models/store';
import { Db, Collection } from 'mongodb';
import cors from 'cors';
const app: Express = express();
app.use(cors());
// Assuming you have a TypeScript version of apiRouter
// import apiRouter from './routes/api';

const PORT: number = 3000;

// Connect to MongoDB

// Handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle requests for static files
// app.use(express.static(path.resolve('../client')));

app.get('/stores', async (req: Request, res: Response) => {
  try {
    const db = client.db('melo');
    const collection = db.collection('locations');
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

// Given a store ID, get the menu items for that store in the menuItems collection and return it
app.get('/store/:storeId/menu', async (req: Request, res: Response) => {
  try {
    const storeId = parseInt(req.params.storeId);
    const db = client.db('melo');
    const storesCollection = db.collection('locations');
    const menuItemsCollection = db.collection('menuItems');

    // Find the store with the given id
    const store = await storesCollection.findOne({ id: storeId });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
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
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

// Catch-all route handler for any requests to an unknown route
app.use((req: Request, res: Response) =>
  res.status(404).send("This is not the page you're looking for...")
);

// Express error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
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

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

export default app;
