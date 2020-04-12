const mongoose = require("mongoose");

const ChatSchema = {
  message: {
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

const CHAT = (module.exports = mongoose.model("Chats", ChatSchema));

module.exports.saveMessage = async function (messageDetail, callback) {
  await CHAT.create(messageDetail, callback);
};

module.exports.getChats = async function (callback) {
  return await CHAT.find(callback)
    .select({ message: 1, email: 1, date: 1, _id: 0 })
    .sort({ date: -1 })
    .limit(100);
};

// module.exports.getDevicebyUserId = function (obj, callback) {
//   query = {
//     username: obj.username,
//     device: obj.device,
//   };
//   DEVICE.findOne(query, callback);
// };

// module.exports.getDevicebyUser = function (username, callback) {};
