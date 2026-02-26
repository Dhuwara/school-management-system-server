import jwt from 'jsonwebtoken'

export const verifyToken= async(req,res,next)=>{
    
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log(decoded,"decodedd")
     req.user = decoded; // attach user info
     next();
   } catch (err) {
     return res.status(401).json({ message: "Invalid token" });
   }
}

export const allowRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).send({message:"Access Denied"})
        }
        next()
    }
}
