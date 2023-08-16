const mongoose = require("mongoose");
const URL =process.env.MONGO_URI ||
  "mongodb+srv://sahilshahu9354:PYduvzClwLiJoJsU@cluster0.jlkodts.mongodb.net/project_backend";
module.exports = () => {
  return mongoose.connect(URL);
};
