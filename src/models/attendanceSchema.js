import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    records: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        studentName: String,
        rollNumber: String,
        status: {
          type: String,
          enum: ["present", "absent"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

// Prevent duplicate attendance for same class same day
attendanceSchema.index(
  { classId: 1, date: 1, academicYear: 1 },
  { unique: true },
);

export default mongoose.model("Attendance", attendanceSchema);
