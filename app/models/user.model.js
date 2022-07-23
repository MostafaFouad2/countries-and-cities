const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength:[6, 'name min 6 ch']
      },
    adress:
      {
        country:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Address',
          required: true
          },
        citey:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Address',
          required: true
          }
      }
  })
);
module.exports = User;