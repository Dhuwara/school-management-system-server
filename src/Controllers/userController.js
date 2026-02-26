import User from '../models/UserSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async(req,res)=>{
  

  try{
    const{email,password} = req.body
    const user = await User.findOne({ email });
    console.log(user)
    if(!user){
      return res.status(401).send({message:"user not found"})

    }

    const isMatch  = await bcrypt.compare(password,user.password)
    if(!isMatch)
      return res.status(401).send({message:"Invalid credentials"})
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .json({ role: user.role });

  }catch(err){
    console.log(err)
    res.status(500).send({message:err.message})
  }
}

export const addUsers = async(req,res)=>{
  console.log(req.params,"req.body")
  const {username, password,email} = req.body
  const {role} = req.params
  console.log(role)
  try{
    const isExisting = await User.findOne({email})

    if(isExisting){
      return res.status(400).send({message:"User is already create"})
    }
    const hashPassword = await bcrypt.hash(password,10)

    const newUser = new User({
      username:username,
      email:email,
      password:hashPassword,
      role:role
    })
    console.log(newUser,"newUser")
    await newUser.save()
    console.log("hitsss")
    res.status(201).json({message:"user created successfully"})
  }catch(err){
    console.log(err)
    res.status(400).send({message:err})
  }
}
