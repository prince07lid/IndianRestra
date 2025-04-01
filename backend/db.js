const mongoose = require("mongoose");

const url = "mongodb+srv://vegrestra:vegrestra123@cluster0.zgnicvb.mongodb.net/vegrestra?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
        const db = mongoose.connection.db;
        
        const collection = db.collection("Vegrestra"); 
        const data = await collection.find({}).toArray(); // Proper async/await

        const vc = db.collection("Vegrestra_category"); 
        const catdata = await vc.find({}).toArray(); // Proper async/await

        global.food_items = data;
        global.food_category = catdata;

        console.log("Data loaded successfully");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
    }
};

module.exports = mongoDB;
