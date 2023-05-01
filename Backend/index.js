const express= require('express');
const cors=require("cors");
require('./db/config');
const User=require("./db/user");
const Product=require("./db/Product")
const app=express();
const jwt=require('jsonwebtoken');
const jwtkey='ecom';

app.use(express.json());
app.use(cors());
// app.get("/register",async(req,resp)=>{
    
//     let result = await User.find();
//     resp.send(result);

// });

app.post("/register",async(req,resp)=>{
    let user=User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password;
    jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            console.log(err)
            // res.send(err);
            resp.send({result:'please try again aftersometime'});  
        }
        resp.send({result,auth:token})
    })

})
app.post("/login",async(req,resp)=>{
    console.log(req.body)
    if(req.body.password&&req.body.email){
        let user=await User.findOne(req.body).select("-password");
        if(user){
            jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    console.log(err)
                    // res.send(err);
                    resp.send({result:'please try again aftersometime'});  
                }
                resp.send({user,auth:token})
            })
            
        }else{
            resp.send({result:'no user found'});
        }
    }else{
        resp.send({result:'no user found'})
    }
})
    app.post("/add-product",verifyToken,async(req,resp)=>{
        let product=new Product(req.body);
        let result=await product.save();
        // result=result.toObject();
        // delete result.password;
        resp.send(result);
    
    
    
})
app.get("/products",verifyToken,async(req,resp)=>{
    
    let products= await Product.find();
    if(products.length>0){
        resp.send(products)
    }else
    resp.send({result:"No Products Find"});
    
});
app.delete("/products/:id",verifyToken,async(req,resp)=>{
    const result=await  Product.deleteOne({_id:req.params.id})
    resp.send(result)
    
    
});
app.get("/products/:id",verifyToken,async(req,resp)=>{
    
    let result=await Product.findOne({_id:req.params.id});

    if(result){
        resp.send(result)
    }else
    resp.send({result:"No Record Find"});
    
});
app.put("/products/:id",verifyToken,async(req,resp)=>{
    const result=await  Product.updateOne(
        {
            _id:req.params.id
        },
        {
            $set:req.body
        }
    )
    resp.send(result)
    
    
});
app.get("/search/:key",verifyToken,async(req,resp)=>{
    let result=await  Product.find({
"$or":[
    {name:{$regex:req.params.key}}
]
    }
    );
    resp.send(result);
});
function verifyToken(req,resp,next){
    let token = req.headers['authorization'];
    if(token){
        token=token.split(' ')[1];
        console.log("middleware called if",token)
        jwt.verify(token,jwtkey,(err,valid)=>{
            if(err){
                resp.status(401).send({result:"please provide valid token"})
            }else{
                next();
            }
        })
    }
    else{
resp.status(403).send({result:"please add token with header"})
    }
    // next();
 }
app.listen(3476)