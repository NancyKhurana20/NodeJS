const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/DataAssociation");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  age: Number,
  posts: [
    //this means that the posts is an array whose type is ids , means it is an Array which will store the ids , and ids will be reference from the post model
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
