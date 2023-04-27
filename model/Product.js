const mongoose=require("mongoose")
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min:1,
    max:20,
    match: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
  },
  visitUrl: {
    type: String,
    required: true,
    unique: true,
    min:1,
    max:300,
    match:/^(ftp|http|https):\/\/[^ "]+$/
  },
  iconUrl: {
    type: String,
    required: [true, "PH1001:ICON is mandatory"],
    unique: true,
    min:1,
    max:300
  },
  smallDescription: {
    type: String,
    min:1,
    max:300
  },
  longDescription: {
    type: String,
    min:1,
    max:300
  },
  images:[String],
  comments: [{
    author:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
      require:true
    },
    description: {
      type:String,
      require:true
    },
}],
    upVotes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true
}],
  tags:[{
    type:mongoose.Schema.Types.ObjectId,ref:"Tag",unique:true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: String
  }
});

module.exports = mongoose.model('Product', ProductSchema);