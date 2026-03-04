import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    standard: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: [true, "Class name is required"],
      trim: true,
    },

    section: {
      type: String,
      required: [true, "Section is required"],
      trim: true,
    },

    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },

    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      trim: true,
    },

    classTeacher: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
    },

    subjects: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    workload: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

classSchema.index({ className: 1, section: 1 }, { unique: true });

export default mongoose.model("Class", classSchema);
