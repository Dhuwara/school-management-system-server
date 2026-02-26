import Class from "../models/ClassSchema.js";

export const configureClass = async (req, res) => {
  try {
      console.log(req.body.className,"poroprprp")
      const {className} = req.body
      
      const isClassExist = await Class.findOne({ className });
      if(isClassExist) {
        return res.status(400).send({message:"class already created"})
      }

      const newClass = new Class({
        ...req.body
      })

      await newClass.save()

      res.status(200).send({message:"class created successfully"})

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  
};

export const getAllClasses = async (req, res) => {
  try {
    const classData = await Class.find();

    return res.status(200).send(classData);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};
