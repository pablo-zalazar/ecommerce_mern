import mongoose from "mongoose";

const publicationSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    quantitySold: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Publication = mongoose.model("Publication", publicationSchema);

export default Publication;
