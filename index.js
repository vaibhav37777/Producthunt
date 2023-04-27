const express = require("express");
const bodyParser = require("body-parser");
const ProductService = require("./ProductService");

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello Welcome to Product Hunt!");
});

app.get("/products", async (req, res) => {
  let products = await ProductService.getProduct();
  res.json(products);
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const product = await ProductService.getProduct(id);
  if (!product) {
    res.status(404).send("Product not found");
  } 
  res.json(product);
});

app.patch("/product/:id/upvotes",async (req,res)=>{
    try {
        const id=req.params.id;
        const user=req.body;
        const response=await ProductService.addUpVote(user,id);
        response?res.status(200).send("upvoted"):res.status(200).send("downvoted")
    }catch(err){
        console.log(err)
        res.status(400).send(err.message)
    }

});

// app.post("/products", async (req, res) => {
//   let product = req.body;
//   let statusState=await ProductService.addProduct(product);
//   if(statusState)
//   res.status(201).send(product);
//   else
//   res.status(400).send('error');
// });
// app.put("/products",(req,res)=>{
//   let product = req.body;
//   ProductService.updateProduct(product)
//   res.status(200).send(product);
// });
// app.delete("/product/:id",(req,res)=>{
//   let id=req.params.id;
//   deleteProductById(id);
//   res.status(200).send("deleted");
// })

app.listen(port, () => {
  console.log(`Product app listening on port ${port}`);
});