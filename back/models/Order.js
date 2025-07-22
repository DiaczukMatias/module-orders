import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    zipcode: { type: String, required: true },
    ext_num: { type: String, required: true },
    int_num: { type: String },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    origin: {
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      address: addressSchema,
    },
    destination: {
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      address: addressSchema,
    },
    productCount: {
      type: Number,
      required: true,
      min: 1,
    },
    totalWeightKg: {
      type: Number,
      required: true,
      min: 0.1,
    },
    packageSize: {
      type: String,
      enum: ["S", "M", "L", "SPECIAL"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "created",
        "collected",
        "at_station",
        "in_transit",
        "delivered",
        "cancelled",
      ],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialNote: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
