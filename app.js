require("dotenv").config();
const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

// Test App  Endpoints
app.get("/", async (req, res) => {
  res.send("LMS API");
});

app.get("/test", async (req, res) => {
  throw new Error("Something went wrong");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3030;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
