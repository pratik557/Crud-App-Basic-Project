const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.uri);

const fn = () => {
  // mongoose.connect(uri)
  mongoose.connect(process.env.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = fn;
