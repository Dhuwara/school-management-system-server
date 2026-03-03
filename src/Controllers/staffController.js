import Staff from "../models/StaffSchema.js";
import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import { getNextSequence } from "../utils/idGenerator.js";

export const addStaff = async (req, res) => {
  try {
    const { firstName, lastName, email, password, ...rest } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const username = firstName + lastName;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "staff",
    });

    const employeeId = await getNextSequence("employeeId");

    await Staff.create({
      firstName,
      lastName,
      ...rest,
      user: newUser._id,
      employeeId,
    });

    res.status(201).json({
      message: "Staff created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};



export const getAllStaffs = async(req,res)=>{
  const staffs = await Staff.find()
  if(!staffs) return res.status(400).send({message:"staffs not found"})

  res.status(200).send(staffs)
}
