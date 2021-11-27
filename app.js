// Imports /////////////////////////////////////////////////////
// Enables us to get the data we need from the enviorment variable
require('dotenv').config();
// async errors

const express = require('express');
const app = express();
// import DB connection
const connectDB = require('./db/connect');

// Middleware /////////////////////////////////////////////////////
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
app.use(express.json());

// Routes /////////////////////////////////////////////////////
app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<h1>Welcome to my store API 🤓</h1><a href="/api/v1/products">Products Route</a>'
    );
});

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
