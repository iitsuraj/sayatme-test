var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProfileSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    message: [{ comment: String, time: { type: Date, default: Date.now() } }]
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updateAt"
    }
  }
);

module.exports = mongoose.model("Profile", ProfileSchema);
