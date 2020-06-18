const express = require("express");
const mongo = require("mongodb");
const uri = "mongodb://localhost:27017/";
const checkAuthentication = require("../middleware/checkauth");
const router = express.Router();

router.get("/posts", (req, res) => {
  mongo.connect(uri, (err, db) => {
    if (err) throw err;
    const postDb = db.db("postdb");
    postDb
      .collection("posts")
      .find()
      .toArray((err, result) => {
        if (err) throw err;
        res.status(200).json({
          message: "Data Fetched Successfully",
          posts: result,
        });
      });
  });
});

router.post("/save", checkAuthentication, (req, res) => {
  const post = {
    title: req.body.t,
    description: req.body.d,
  };
  mongo.connect(uri, (err, db) => {
    if (err) throw err;
    const postDb = db.db("postdb");
    postDb.collection("posts").insertOne(post, (err, result) => {
      if (err) throw err;

      res.status(200).json({
        message: "Data Saved Successfully",
        posts: result,
      });
    });
  });
});

module.exports = router;
