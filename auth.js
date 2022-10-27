const router = require("express").Router();
const User = require("./model/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//routes
router.post("/register", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  let value = await req.body.password;
  if (value != req.body.confirmPassword) {
    {
      res.status(400).send({ message: "password does not match" });
    }
  } else if (emailExist) {
    res.status(400).send({ message: "email already in use" });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        fname: req.body.fname,
        sname: req.body.sname,
        email: req.body.email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });
      const savedUser = await user.save();
      res.status(201).send({
        message: `${user.fname}, Thank you for creating your account`,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

router.post("/login", async (req, res) => {
  //checking if email exists
  const userdt = await User.findOne({ email: req.body.email });
  if (!userdt) {
    return res.status(400).send({ message: "Username is not found" });
  } else {
    //validating if password is correct
    const validPass = await bcrypt.compare(req.body.password, userdt.password);
    if (!validPass) {
      return res.status(400).send({ message: "Email or Password is wrong" });
    } else {
     
      res 
        .status(200)
        .send({ message: `You Logged in as ${userdt.fname}` });
    }
  }
/*   const login=(req,res,next)=>{
    var email=req.body.email
    var password=req.bcrypt.password
    user.findOne({$or:[{email}]
    .then (user=>{
      if(user){
        bcrypt.compare(password,user.password, function(err, result){
          if(err){
            res.json({err:err})
          }
          if(result){
            let token=jwt.sign({email:user.email})
            res.json({message:'login successfully'})
          }
          else{
            res.json({message:'password does not match'})
          }
        })

      }
      else{
        res.json({
          message:"no email found"
        })
      }
    })})
  } */
}); 
//export router
module.exports = router;
