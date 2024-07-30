import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [1, "Price must be 1 or above"],
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    noOfReview: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: [
      {
        path: {
          type: String,
        },
        filename: {
          type: String,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
