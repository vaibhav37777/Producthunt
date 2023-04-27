const mongoose=require("mongoose")
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min:1,
    max:20,
    match: /^[a-zA-Z0-9]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
  },
  designation: {
    type: String,
    // min:1,
    // max:50,
    match: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
  },
  visitUrl: {
    type: String,
    unique: true,
    // min:1,
    // max:300
  },
  iconUrl: {
    type: String,
    unique: true,
    // min:1,
    // max:300
  },
  description: {
    type: String,
    // min:1,
    // max:300
  },
  points:{
    type:Number
  },
  links:[String],
  badges:[String],
  intrests:[String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);