const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
 const router=require('./auth')
let port=process.env.PORT || 7000
//initialize app
const app=express();
//middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(router)
dotenv.config()

//connect to db 
mongoose.connect(process.env.MONGO_DB,()=>{
    console.log('connected to db');
})
 


app.get('/',(req,res)=>{
    res.json({message:'this is a homepage'})
})

/* app.post('/register', async(req,res)=>{
const createUser=new user({
    fname:req.body.fname,
    sname:req.body.sname,
    email:req.body.email,
    password:req.body.password,
    confirmPassword:req.body.confirmPassword
})
const savedUser=await createUser.save()
console.log(savedUser);
res.send({message:'created successfully'})


}) */

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})