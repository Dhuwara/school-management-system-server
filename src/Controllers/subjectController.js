import Subject from "../models/SubjectSchema.js";

export const addSubject = async (req, res) => {
  try {
    const { subjectCode } = req.body;

    const isSubjectExist = await Subject.findOne({ subjectCode });
    console.log(isSubjectExist, "esiststst");

    if (isSubjectExist)
      return res.status(400).send({ message: "Subject already exist" });

    const newSubject = new Subject({
      ...req.body,
    });
    console.log(newSubject);

    await newSubject.save();
    return res.status(200).send({ message: "Subject added successfully",data:newSubject });
  } catch (err) {
    console.log(err);
    return res.send(500).send({ message: err });
  }
};

export const getallSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();

    return res.status(200).send(subjects);
  } catch (err) {
    console.log(err);
    return res.send(500).send({ message: err });
  }
};

export const updatesubject = async (req, res) => {
  try {
    const {id} = req.params
    const updateData = req.body;

   

    const updateSubject = await Subject.findByIdAndUpdate(id,updateData,{
        new:true,
        runValidators:true
    })

    if(!updateSubject){
        return res.status(400).json({message:"Subject not found"})
    }
    res
      .status(200)
      .json({ message: "subject updated succesfully", data: updateSubject });
    
  } catch (err) {
    console.log(err);
    return res.send(500).send({ message: err });
  }
};