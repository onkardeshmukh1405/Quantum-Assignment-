const express = require("express");
const app = express();
const cors = require("cors");
const { connectDatabase } = require("./db");
require("dotenv").config();

connectDatabase();

app.use(express.json());
app.use(cors());

const userRoute = require("./routes/user");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
