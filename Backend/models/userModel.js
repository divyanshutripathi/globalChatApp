const mongoose = require("mongoose");

const userModel = {
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
};
const USER = (module.exports = mongoose.model("user", userModel));

module.exports.getAllData = async function (callback) {
  await USER.find(callback);
};

module.exports.addUser = async function (user, callback) {
  await USER.create(user, callback);
};

module.exports.getbyEmail = async function (email, callback) {
  query = {
    email: email,
  };
  await USER.findOne(query, callback);
};

module.exports;
