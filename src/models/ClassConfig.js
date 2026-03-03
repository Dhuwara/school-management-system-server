import mongoose from "mongoose";

const classConfigSchema = new mongoose.Schema(
  {
    prefix: {
      type: String,
      required: true,
      trim: true,
    },
    standardFormat: {
      type: String,
      required: true,
      enum: ["number", "roman"], // restrict values
    },
    sectionFormat: {
      type: String,
      required: true,
      enum: ["ABC", "numeric"], // restrict values
    },
  },
  { timestamps: true },
);

export default mongoose.model("ClassConfig", classConfigSchema);
