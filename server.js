const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas Connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://vaibhavgupta2542_db_user:Raghavg123@aos.jctvpvu.mongodb.net/aos_ecommerce?retryWrites=true&w=majority&appName=aos",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(compression());
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:8080",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public", { maxAge: "1d", etag: false }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Contact Schema & Model
const Contact = mongoose.model('Contact', new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
}));

// Contact API (Data Save hoga Atlas pe)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.json({ success: true, message: "Contact saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Product, Customer, Order Schemas
const productSchema = new mongoose.Schema({ /*...same as pehle...*/ });
const customerSchema = new mongoose.Schema({ /*...same as pehle...*/ });
const orderSchema = new mongoose.Schema({ /*...same as pehle...*/ });

const Product = mongoose.model("Product", productSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Order = mongoose.model("Order", orderSchema);

// Baki tumhare custom functions, product/order APIs, error handlers wagaira
// Initialize products if needed, and all your API endpoints

// Server Start
app.listen(PORT, () => {
  console.log(`AOS E-commerce server running on port ${PORT}`);
  // initializeProducts(); (agar zaroori ho)
});

module.exports = app;
