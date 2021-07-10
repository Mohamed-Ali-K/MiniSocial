const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/post");
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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added sucessfully!",
      postId: createdPost._id,
    });
  });
});
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json({ message: "Post Updated!" });
  });
});
app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post=>{
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: "Post Not Found!" });
    }
  })
});
app.use("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    return res.status(200).json({
      message: "Posts featched succesfully!",
      posts: documents,
    });
  });
});

module.exports = app;
