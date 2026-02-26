import Student from "../models/StudentSchema.js";
import bcrypt from "bcrypt";

const createStudent = async (req, res) => {
  console.log(req.body);
  try {
    const { student, parent, address } = req.body;

    const isExisting = await Student.findOne({
      rollNumber: student.rollNumber,
    });

    if (isExisting) {
      return res.status(400).json({
        message: "Student with this roll number already exists",
      });
    }

    const newStudent = new Student({
      name: student.name,
      dob: student.dob,
      gender: student.gender,
      rollNumber: student.rollNumber,
      classSection: student.class_section,
      status: student.status,
      parent,
      address,
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student created successfully",
      data: newStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
};

const getStudent = async (req, res) => {
  const {id}= req.params
  console.log(id,"idd")
  try {
    const student = await Student.findById(id);
    res.status(200).json(student);
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { student, parent, address } = req.body;

    const existingStudent = await Student.findById(id);

    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        ...student, 
        parent,
        address,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    console.log(req.body)
    console.log(updatedStudent, "updatesdstudeet");

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: deletedStudent,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export {
  createStudent,
  getAllStudent,
  getStudent,
  updateStudent,
  deleteStudent,
};
