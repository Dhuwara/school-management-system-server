import jwt from 'jsonwebtoken'

export const verifyToken= async(req,res)=>{
    console.log("hitsss")
   const authHeader = req.headers.authorization

   if(!authHeader)
    return res.status(401).send({message:"No token provided"})

   const token = authHeader.spli(" ")[1]

   jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    if(err)
        return res.staus(403).send({message:"Invalid token"})
    req.user = decoded
    next()
   })
}

export const allowRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).send({message:"Access Denied"})
        }
    }
}
