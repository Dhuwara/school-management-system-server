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

const getStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
};
export { createStudent, getStudent };
