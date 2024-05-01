require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const discussionRoutes = require("./routes/discussion.routes");
const configureStrategy = require("./config/passport");
const authenticate = require("./middlewares/authenticate.middleware");

const DB_URI = "mongodb://127.0.0.1:27017";

const app = express();
const PORT = 8082;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((error) => console.log("Failed to connect to DB\n", error));

configureStrategy(passport);

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:8081",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/auth", authRoutes);

app.use(authenticate);
app.use("/user", userRoutes);
app.use("/discussion", discussionRoutes);

app.listen(PORT, () => {
  console.log("Server Listening at", PORT);
});
