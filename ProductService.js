const ProductDAO = require("./ProductDAO");
const mongoose=require("mongoose")

const getProduct = async (id) => {
    try {
      let query = {};
  
      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          query._id = new mongoose.Types.ObjectId(id);
        } else {
          throw new Error("Invalid id parameter");
        }
      }
      return await ProductDAO.getProductFromDB(query);
    } catch (error) {
        Error.captureStackTrace(error);
        throw new Error(error.message);
    }
};

const addProduct=async (product)=>{
    try {
        const result=await ProductDAO.addProductToDB(product);
        return result;
    }
    catch(err){
        throw err;
    }
}

const updateProduct=async(pBody,id)=>{
    try{
        const result=await ProductDAO.updateProductFromDB(pBody,id);
        return result;
    }
    catch(err){
        throw err;
    }
}

const addUpVote=async (user,prdid)=>{
    try{
        const result=await ProductDAO.addUpVoteToProduct(user,prdid);
        console.log(result);
        return result;
    }catch(err){
        throw err;
    }
}

const addComment=async(commentbody,prdid)=>{
    try{
        const result=await ProductDAO.addCommentToProduct(commentbody,prdid)
        return result;
    }
    catch(err){
        throw err;
    }
}
const deleteProduct=async(id,userid)=>{
    try{
        return await ProductDAO.deleteProductFromDB(id,userid)
    }
    catch (err){
        throw err;
    }
}
const addTag=async(tagid,prdid)=>{
    try{
        return await ProductDAO.addTagToProduct(tagid,prdid)
    }catch(err){
        throw err
    }
}
module.exports={
    getProduct,
    addProduct,
    addUpVote,
    addComment,
    deleteProduct,
    addTag,
    updateProduct
}