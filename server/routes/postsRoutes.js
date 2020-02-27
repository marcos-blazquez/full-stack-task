const mongoose = require("mongoose");

require("../models/Post");

const Posts = mongoose.model("posts");

module.exports = app => {
  //get all posts
  app.get("/", (req, res) => {
    res.send(
      JSON.stringify({
        hello: "World"
      })
    );
  });
  app.get("/api/posts", (req, res) => {
    Posts.find({ deleted: false }, function(err, result) {
      if (err) throw err;
      if (result) {
        res.json(result);
      } else {
        res.send(
          JSON.stringify({
            error: "Error"
          })
        );
      }
    });
  });
  //update to deleted
  app.put("/api/hide-post/:id", function(req, res) {
    Posts.findOneAndUpdate({ objectID: req.params.id }, { deleted: true }).then(
      function() {
        Posts.findOne({ objectID: req.params.id }).then(function(response) {
          res.send(response);
        });
      }
    );
  });
};
