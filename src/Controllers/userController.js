import User from "../models/UserSchema.js"
import bcrypt from 'bcrypt'

const createUser = async (req, res) => {
 const {username,password,role} = req.body
    try{

    const isExisting = await User.findOne({username})

    if(isExisting){
        return res.status(400).send({message:"User is already created"})
    } 

    const hashPassword = await bcrypt.hash(password,10)

    const newUser = new User({
        username:username,
        password:hashPassword,
        role:role
    })

    await newUser.save()
    res.status(201).json({
      message: `User registered with username ${username}`,
    });

    }catch(err){
        res.status(400).send({message:"something wrong"})
    }
  }

export { createUser };
