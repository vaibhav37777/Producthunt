const mongoose = require('mongoose');
const Product=require("./model/Product.js");
const Tag=require("./model/Tag.js")
const User=require("./model/User.js");
const uri = 'mongodb://0.0.0.0:27017/producthunt';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

async function getProductFromDB(query){
  try {
    if(!query._id)
    {
      let product = await Product.find({},
        {
          name:1,
          visitUrl:1,
          iconUrl:1,
          smallDescription:1,
          upVotes:1,
          comments:1,
          tags:1,
          createdBy:1
        }).
        populate(`tags comments upVotes createdBy`).
        lean();

      product= product.map((ele)=>{
        ele.upVoteCount=ele.upVotes?.length;
        ele.commentCount=ele.comments?.length;
        return ele;
      });
      return product;
    }
    else
    {
      let productById = (await Product.find({_id:query._id}).
      populate(`tags comments upVotes createdBy`).
      lean());
      if(productById[0])
      {
        productById[0].upVoteCount=productById?.upVotes?.length;
        productById[0].commentCount=productById?.comments?.length;
        return productById;
      }
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}


async function addProductToDB(product){
  try{
    const newProduct=new Product({
      name:product.name,
      visitUrl:product.visitUrl,
      iconUrl:product.iconUrl,
      smallDescription:product.smallDescription,
      longDescription:product.longDescription,
      images:product.images,
      tags:product.tags,
      createdBy:product.userid
    });
    const check=await newProduct.save();
    return check;
  } 
  catch(error){
    throw error;
  }
}


async function addUserToDB(user){
  try{
    const newUser=new User({
      name:user.name,
      visitUrl:user.visitUrl,
      iconUrl:user.iconUrl
    });
    await newUser.save();
  } 
  catch(error){
    throw error;
  }
}

async function updateProductFromDB(pBody,id){
  try{
    const result=await Product.findOneAndUpdate({_id:id,createdBy:pBody.updatedBy},pBody)
    return result;
  }
  catch(err){
    throw err;
  }
}


async function addUpVoteToProduct(user,prdid){
  try {
    let voteStatus = await Product.updateOne({ _id: prdid },  { $addToSet: { upVotes: user._id.$oid } });

    if(voteStatus?.matchedCount===0)
    {
      throw new Error("Product doesn't exists")
    }
    if(!voteStatus?.modifiedCount)
    {
      voteStatus = await Product.updateOne({ _id: prdid },  { $pull: { upVotes: user._id.$oid } });
      console.log(voteStatus,"deleted");
      return false;
    }
    return true;
  } catch (err) {
    throw err;
  }
}
async function addCommentToProduct(commentBody,prdid){
  try{
    let commentresult=await Product.updateOne({_id:prdid},{$push:{comments:{author:commentBody.userid,description:commentBody.description}}})
    console.log(commentresult)
    if(commentresult.modifiedCount)
    return `${commentBody.description} added successfully`;
  }catch(err){
    throw err;
  }
}

async function addTagToProduct(tagid,prdid){
  try{
    const checkTagIdExist=await Tag.findById(tagid);
    if(!checkTagIdExist)
    throw new Error("Tag don't exist");
    if(checkTagIdExist?.active)
    {
      const result=await Product.updateOne({_id:prdid},{$addToSet:{tags:tagid}})
      if(!result.matchedCount)
      throw new Error(`Product not Exist`)
      return result.modifiedCount?`Tag added`:`Tag already Exists`;
    }
  }
  catch(err){
    throw err;
  }
}

async function deleteProductFromDB(id,userid) {
  try {
    const result = await Product.deleteOne({ _id: id,createdBy:userid });
    console.log(`Deleted ${result.deletedCount} document(s)`);
    return result.deletedCount;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

addTagToProduct("6449f6f41585de4b6eb1d193","64477a6700a016d9ddf1e221");



// deleteProductFromDB("6448d46f703a808660a562b0")

// addCommentToProduct({
//   userid:"6448274287f725431aef8d4b",
//   description:"dfkv56erjbfjesw56d65e+d5edn765ed6789edh"
// },"64477a6700a016d9ddf1e221")



module.exports = {
  getProductFromDB,
  addProductToDB,
  addUpVoteToProduct,
  addUserToDB,
  addCommentToProduct,
  deleteProductFromDB,
  updateProductFromDB,
  addTagToProduct
};