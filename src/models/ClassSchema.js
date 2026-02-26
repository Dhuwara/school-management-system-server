import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    class_teacher: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Class", classSchema);
