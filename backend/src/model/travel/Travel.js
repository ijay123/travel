import mongoose from "mongoose";

const travelSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
      enum: ["USA", "Canada", "Australia","China","Nigeria", "Ghana", "South Africa"], //add more countries here if needed
    },
    travelType: {
      type: String,
      required: true,
      enum: ["Economy", "Business", "First Class"],
    },
    departureDate: {
      type: Date,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v); // Validates HH:mm format
        },
        message: (props) => `${props.value} is not a valid time format!`,
      },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const TravelModel = mongoose.model("Travel", travelSchema);

export default TravelModel;
