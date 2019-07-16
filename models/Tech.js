const mongoose = require("mongoose");

const TechSchema = mongoose.Schema({
      id: {
        type: Number
      },
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: Object,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
//   loading: {
//     type: Boolean,
//     default: false
//   },
//   error: {
//     type: Error,
//     default: null
//   }
});

module.exports = mongoose.model("tech", TechSchema);
