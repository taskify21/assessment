import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "delivery"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    default: Date.now(),
  },
});

// Clear the Mongoose models cache for the 'Users' model
delete mongoose.models["Users"];

// Define the 'Users' model
const User = models.UserModal || model("Users", userSchema);

export default User;
