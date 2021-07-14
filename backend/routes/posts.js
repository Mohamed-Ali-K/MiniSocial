const express = require("express");
const checkAuth = require("../middleware/check-auth");
const postControler = require("../controllers/post");
const fileStroge = require("../middleware/fileStorge");
const router = express.Router();

router.post("", checkAuth, fileStroge, postControler.createPost);

router.put("/:id", checkAuth, fileStroge, postControler.editPost);

router.delete("/:id", checkAuth, postControler.deletePost);

router.get("/:id", postControler.getPost);

router.get("", postControler.getPosts);

module.exports = router;
