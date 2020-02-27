const mongoose = require("mongoose");
require("dotenv").config();
function connect() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DB_URI, { useNewUrlParser: true })
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
  });
}

module.exports = {
  connect
};
