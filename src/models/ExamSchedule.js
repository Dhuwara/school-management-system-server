import mongoose from "mongoose";

const subjectScheduleSchema = new mongoose.Schema({
  subjectCode: { type: String, required: true },
  subjectName: { type: String, required: true },

  date: { type: String }, // YYYY-MM-DD
  startTime: { type: String }, // HH:mm
  endTime: { type: String }, // HH:mm
  room: { type: String },

  maxMarks: { type: Number, required: true },
});

const examScheduleSchema = new mongoose.Schema(
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

    examType: {
      type: String,
      required: true, // cat1, quarterly, etc
    },

    examName: String,

    startDate: String,
    endDate: String,

    scheduleType: {
      type: String,
      enum: ["all", "section"],
      default: "all",
    },

    sections: [String],

    subjectSchedule: [subjectScheduleSchema],
  },
  { timestamps: true },
);

// 🔥 VERY IMPORTANT
examScheduleSchema.index(
  { classId: 1, academicYear: 1, examType: 1 },
  { unique: true },
);

export default mongoose.model("ExamSchedule", examScheduleSchema);
