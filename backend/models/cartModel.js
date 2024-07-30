import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export default mongoose.model("cart", cartSchema);
