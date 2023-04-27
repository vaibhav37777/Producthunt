const mongoose=require("mongoose")
const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min:1,
    max:20,
    match: /^[a-zA-Z0-9]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
  },
  active: {
    type: Boolean,
    required:true
  }
});

module.exports = mongoose.model('Tag', TagSchema);