import Class from "../models/ClassSchema.js";




export const createClass = async (req, res) => {

  console.log(req.body,"reqqq")
  try {
    const { className, section, capacity, roomNumber, classTeacher, subjects } =
      req.body;

    if (!className || !section || !capacity || !roomNumber || !classTeacher) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const isClassExist = await Class.findOne({ className, section });

    if (isClassExist) {
      return res.status(400).json({
        message: "Class already created for this section",
      });
    }

    const newClass = await Class.create({
      className,
      section,
      capacity,
      roomNumber,
      classTeacher: {
        _id: classTeacher._id,
        firstName: classTeacher.firstName,
      },
      subjects,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
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
export const getClass = async (req, res) => {
  const { id } = req.params;

  try {
    const classData = await Class.findById(id);
    return res.status(200).send(classData);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params; 
    const updateData = req.body;

    const updatedClass = await Class.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, 
    });

    if (!updatedClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    res.status(200).json({
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
