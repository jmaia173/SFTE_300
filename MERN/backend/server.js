import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json()); // to accept json data

app.post("/api/products", async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create products", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});



app.listen(5500, () => {
    connectDB();    
    console.log('Server started at http://localhost:5500');
})

/*oMU9IOiGNJOtVeY5*/