import mongoose, { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderData: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Received", "Ready", "Pickup", "Deliverd"],
    default: "Pending",
  },
  updatedAt: {
    type: String,
    default: Date.now(),
  },
  deliveryId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

// Clear the Mongoose models cache for the 'Orders' model
delete mongoose.models["Orders"];

// Define the 'Orders' model
const Order = models.OrdersModal || model("Orders", orderSchema);

export default Order;
