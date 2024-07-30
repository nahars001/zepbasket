import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    shippingInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      phoneNo: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
      },
      note: {
        type: String,
      },
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
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
      },
    ],
    priceInfo: {
      subTotal: {
        type: Number,
        required: true,
      },
      shippingAmount: {
        type: Number,
      },
      taxAmount: {
        type: Number,
      },
      discountAmount: {
        type: Number,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },
    paymentInfo: {
      paymentStatus: {
        type: String,
        required: true,
        enum: ["Paid", "Not paid"],
      },
      paymentTransactionId: {
        type: String,
      },
      paymentMethod: {
        type: String,
        required: true,
      },
    },
    orderInfo: {
      orderStatus: {
        type: String,
        required: true,
        enum: [
          "Cancelled",
          "Processing",
          "Shipping",
          "Shipped",
          "Dispatched",
          "Delivered",
        ],
      },
      orderTrackingId: {
        type: String,
      },
    },
    userInfo: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      userName: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
