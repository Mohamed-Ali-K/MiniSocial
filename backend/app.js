const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/post");

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: "Post added sucessfully!",
  });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fdfdgh5454l",
      title: "Frist server-side post",
      content: "this is coming from the server",
    },
    {
      id: "zerrerf556423ed",
      title: "Second server-side post",
      content: "this is also coming from the server",
    },
  ];
  return res.status(200).json({
    message: "Posts featched succesfully!",
    posts: posts,
  });
});
module.exports = app;
