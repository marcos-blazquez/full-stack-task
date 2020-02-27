const express = require("express");
var Request = require("request");
const cors = require("cors");
require("dotenv").config();
require("./db/index").connect();
require("./models/Post");

function intervalFunc() {
  Request.get(process.env.REQUEST_URL, (error, response, body) => {
    if (error) {
      return console.log(error);
    }
    const { hits } = JSON.parse(body);
    saveHits(hits);
  });
}

const saveHits = async hits => {
  for (let index = 0; index < hits.length; index++) {
    const record = hits[index];
    await Post.findOne({ objectID: record.objectID }).then(existingRecord => {
      if (existingRecord) {
      } else {
        (async post => {
          await new Post({
            ...post,
            deleted: false
          }).save();
        })();
      }
    });
  }
};

setInterval(intervalFunc, 10 * 1000); //one hour interval

const PORT = process.env.PORT || 5000;
const app = express(PORT);
app.use(cors());
require("./routes/postsRoutes")(app);
app.listen(PORT);
