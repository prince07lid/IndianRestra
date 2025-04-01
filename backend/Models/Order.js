const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [{ name: String, price: Number, quantity: Number }],
    totalAmount: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);

