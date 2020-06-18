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

router.post("/delete", (rq, rs) => {
  const title = rq.body.title;
  let query = { title: title };
  mongo.connect(url, (err, db) => {
    const post_db = db.db("postdb");
    post_db.collection("posts").deleteOne(query, (err, rslt) => {
      if (err) throw err;
      rs.status(200).json({
        message: "data fetched",
        posts: rslt,
      });
    });
  });
});

router.post("/find", (rq, rs) => {
  const title = rq.body.title;
  let query = { title: title };
  mongo.connect(url, (err, db) => {
    const post_db = db.db("postdb");
    post_db.collection("posts").findOne(query, (err, rslt) => {
      if (err) throw err;
      rs.status(200).json({
        message: "data fetched",
        posts: rslt,
      });
    });
  });
});

module.exports = router;
