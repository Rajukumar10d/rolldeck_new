import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    index: { type: Number, required: true },
    title: { type: String, required: true },
    tag: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

projectSchema.index({ index: 1 }, { unique: true });

export const Project = mongoose.model("Project", projectSchema);

