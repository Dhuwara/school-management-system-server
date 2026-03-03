import mongoose from "mongoose";

const periodSchema = new mongoose.Schema(
  {
    periodNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      default: null, 
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },
    roomNumber: {
      type: String,
      default: "",
    },
    isBreak: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const daySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      required: true,
    },
    periods: [periodSchema],
  },
  { _id: false },
);

const timetableSchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
   
    schedule: [daySchema],

    isActive: {
      type: Boolean,
      default: true,
    },
   
  },
  { timestamps: true },
);

export default mongoose.model("Timetable", timetableSchema);
