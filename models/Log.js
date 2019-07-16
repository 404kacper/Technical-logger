const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
    id: {
      type: Number
    },
    message: {
      type: String,
      required: true
    },
    attention: {
      type: Boolean,
      required: true
    },
    tech: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  //   current: {
  //     type: Object,
  //     default: null
  //   },
  //   loading: {
  //     type: Boolean,
  //     default: false
  //   },
  //   error: {
  //     type: Error,
  //     default: null
  //   }
});

module.exports = mongoose.model("log", LogSchema);
