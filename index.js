const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));


let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];
let cors=require('cors');
app.use(cors());

function addProduct(cart,newItem){
  cart.push(newItem);
  return cart
}
app.get('/cart/add',(req,res)=>{
  let productId=parseInt(req.query.productId);
  let name=req.query.name;
  let price=parseInt(req.query.price);
  let quantity=parseInt(req.query.quantity);
  let newItem={
    productId:productId,
    name:name,
    price:price,
    quantity:quantity
  }
  let newCart=addProduct(cart,newItem)
  res.json({cartIems:newCart});
})

function updateQuantity(cart,quantity,productId){
  for(let i=0;i<cart.length;i++){
    if(cart[i].productId==productId){
      cart[i].quantity=quantity
      break;
    }
  }
  return cart
}
app.get('/cart/edit',(req,res)=>{
  let productId=parseInt(req.query.productId);
  let quantity=parseInt(req.query.quantity);
  let result=updateQuantity(cart,quantity,productId)
  res.json({cartIems:result})
})
function deleteProductById(product,productId){
  return product.productId!=productId
}
app.get('/cart/delete',(req,res)=>{
  let productId=parseInt(req.query.productId)
  cart=cart.filter(product=>deleteProductById(product,productId))
  res.json({newCart:cart})
})

app.get("/cart",(req,res)=>{
  res.json({newCart:cart})
})
function totalQuantity(cart){
  let totalquantity=0;
  for(let i=0;i<cart.length;i++){
    totalquantity+=cart[i].quantity;
  }
  return totalquantity
}
app.get('/cart/total-quantity',(req,res)=>{
  let result=totalQuantity(cart)
  res.json({totalQuanity:result})
})
function totalPrice(cart){
  let totalprice=0;
  for(let i=0;i<cart.length;i++){
    totalprice+=cart[i].price;
  }
  return totalprice
}
app.get('/cart/total-price',(req,res)=>{
  let result=totalPrice(cart)
  res.json({totalPrice:result})
})










app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
