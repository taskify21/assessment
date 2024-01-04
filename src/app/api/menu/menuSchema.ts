import mongoose, { Schema, model, models } from "mongoose";

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    default: Date.now(),
  },
});

// Clear the Mongoose models cache for the 'Menu' model
delete mongoose.models["Menu"];

// Define the 'Menu' model
const Menu = models.MenuModal || model("Menu", menuSchema);

export default Menu;
