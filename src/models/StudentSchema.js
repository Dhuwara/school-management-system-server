import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    classSection: { type: String, required: true },
    status: { type: String, required: true },

    parent: {
      name: { type: String, required: true },
      contactNumber: { type: String, required: true },
      email: { type: String, required: true },
    },

    address: { type: String, required: true },
  },
  { timestamps: true },
);



export default mongoose.model("Student", studentSchema);
