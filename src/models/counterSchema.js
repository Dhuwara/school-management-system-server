import mongoose  from "mongoose";

const counterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    year:{
        type:Number,
        required:true,
    },
    prefix:{
        type:String,
        required:true,
    },
    seq:{
        type:Number,
        default:0,

    },
    start:{
        type:Number,
        default:1,
    },
    padding:{
        type:Number,
        default:3
    },

})

export default mongoose.model("Counter",counterSchema)