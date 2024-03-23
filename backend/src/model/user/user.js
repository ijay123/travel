import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      unique: true,
      max: 20,
      required: [true, "Please supply the first name"],
    },
    lastName: {
      type: String,
      unique: true,
      max: 20,
      required: [true, "Please supply the last name"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female"],
    },
    email: {
      type: String,
      required: [true, "Please supply the email"],
      unique: true,
    },
    avatar: {
      type: String,
    },

    role: { type: String, enum: ["regular", "admin"], default: "regular" },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
