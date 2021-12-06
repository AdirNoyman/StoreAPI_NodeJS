// Imports /////////////////////////////////////////////////////
// Enables us to get the data we need from the enviorment variable
require('dotenv').config();
// This package catching error thrown and wraps our controllers with try-catch blocks
require('express-async-errors');

const express = require('express');
const app = express();
// import DB connection
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
// Middleware /////////////////////////////////////////////////////
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
app.use(express.json());

// Routes /////////////////////////////////////////////////////
// Home Route
app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<h1>Welcome to my store API 🤓</h1><a href="/api/v1/products">Products Route</a>'
    );
});

app.use('/api/v1/products', productsRouter);

// Products Route

// Activate utils middleware

app.use(errorMiddleware);
app.use(notFoundMiddleware);

// Dynamic port so it will inlined with the port that will be set in the enviorement that the app will be runed
const port = process.env.PORT || 3000;

const start = async (req, res) => {
  try {
    // Connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port} 😎🤘`));
  } catch (error) {
    console.log(error);
  }
};

start();
