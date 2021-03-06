const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user");
const mongoos = require("mongoose");

const app = express();
mongoos.set("useNewUrlParser", true);
mongoos.set("useFindAndModify", false);
mongoos.set("useCreateIndex", true);
mongoos.set("useUnifiedTopology", true);
mongoos
  .connect("mongodb://localhost:27017/MiniSocial")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("connect faild");
  });

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("./images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoute);
app.use("/api/user", userRoute );

module.exports = app;
