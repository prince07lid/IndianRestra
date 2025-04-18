const express = require("express");
const router = express.Router();
const Order = require("../Models/Order");

router.post("/placeorder", async (req, res) => {
    try {
        const { userId, cartItems, totalAmount } = req.body;

        if (!userId || !cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Invalid order data" });
        }

        const newOrder = new Order({
            userId,
            cartItems,
            totalAmount,
            date: new Date(),
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
