
import Subject from "../models/SubjectSchema.js";

const addSubject = async(req,res)=>{
    try{
        const {subjectCode} = req.body
        
        const isSubjectExist = await Subject.findOne({ subjectCode });
        console.log(isSubjectExist,"esiststst")

        if(isSubjectExist) return res.status(400).send({message:"Subject already exist"})

        const newSubject =  new Subject({
            ...req.body
        })
        console.log(newSubject)
        
        await newSubject.save()
        return res.status(200).send({message:"Subject added successfully"})
        

    }catch(err){
        console.log(err)
        return res.send(500).send({message:err})
    }
}

export default addSubject