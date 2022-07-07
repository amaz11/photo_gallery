const express = require("express");
const photoUpload = require("./routes/photoUploade");
const { default: mongoose } = require("mongoose");

const app = express();

app.use("/photoUpload", photoUpload);

app.get("/", (req, res) => {
  res.send("<h1>Hello Backend</h1>");
});

const dburl = "mongodb://localhost:27017/photouploade";
mongoose
  .connect(dburl)
  .then(() => {
    console.log("Connected Successfull");
  })
  .catch((err) => {
    console.log("Connection Fail", err);
  });
app.listen(4000, (req, res) => {
  console.log("server start");
});
