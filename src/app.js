const express = require("express");
const path = require("path");
const appRouter = require("./routes");
const connectToDatabase = require("./config/connection");
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.use("/api", appRouter);

app.listen(PORT, async () => {
  console.log("Server is running on port 3000");
  await connectToDatabase();
});
