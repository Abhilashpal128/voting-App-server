const mongoose = require("mongoose");

const MongoConnection = (url) => {
  return mongoose.connect(url);
};

module.exports = MongoConnection;
