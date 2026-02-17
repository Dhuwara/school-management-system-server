import User from '../models/UserSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async(req,res)=>{

  try{
    const{username,password} = req.body
    const user = await User.findOne({username})

    if(!user){
      return res.status(401).send({message:"user not found"})

    }

    const isMatch  = await bcrypt.compare(password,user.password)
    if(!isMatch)
      return res.status(401).send({message:"Invalid credentials"})

    const token = jwt.sign({
      id:user._id,
      role:user.role,
    },
    process.env.JWT_SECRET,
    {expires:'1d'},
    res.status(200).send({
      token,
      user:{
        id:user._id,
        name:user.name
      }
    })
  )
  }catch(err){
    res.status(500).send({message:err.message})
  }
}

export default {login}