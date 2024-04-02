import mongoose, { Schema, Types, model } from "mongoose";
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const categoryModel =
  mongoose.models.Category || model("Category", categorySchema);
export default categoryModel;
