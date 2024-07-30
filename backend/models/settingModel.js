import mongoose, { Schema } from "mongoose";

const settingSchema = new Schema({
  settingId: {
    type: String,
    required: true,
  },
  settingValue: {
    type: String,
    required: true,
  },
});
