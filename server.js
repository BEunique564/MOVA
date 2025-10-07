const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
require("dotenv").config();
const mongoose = require('mongoose');
require('dotenv').config(); // Agar .env mein URI rakha hai

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error: ", err));


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:8080",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(
  express.static("public", {
    maxAge: "1d",
    etag: false,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Database connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/aos_ecommerce",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
// Mongoose schema file ke upar ya server.js ke upar add karo
const mongoose = require('mongoose');

// Contact schema bana lo (server.js ke upar ya models file me)
const Contact = mongoose.model('Contact', new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
}));

// Contact form POST route add karo (server.js me existing '/api/contact' ke andar):
app.post('/api/contact', async (req, res) => {
  try {
    // Client se jo aayega (frontend form se)
    const { name, email, message } = req.body;
    // New doc create karo
    const contact = new Contact({ name, email, message });
    await contact.save();   // MongoDB Atlas me save karega
    res.json({ success: true, message: "Contact saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Database Schemas
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  sizes: [{ type: String }],
  category: { type: String, required: true },
  ingredients: [{ type: String }],
  benefits: [{ type: String }],
  stock: { type: Number, default: 100 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      size: String,
      quantity: Number,
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  paymentId: String,
  shippingAddress: {
    street: String,
    city: String,
    zipCode: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Models
const Product = mongoose.model("Product", productSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Order = mongoose.model("Order", orderSchema);

// Initialize products if database is empty
async function initializeProducts() {
  const count = await Product.countDocuments();
  if (count === 0) {
    const products = [
      {
        name: "AOS Organic Face Pack - 100G",
        description:
          "Premium organic face pack with natural ingredients for deep cleansing and hydration. Perfect for weekly skincare routine.",
        price: 45.99,
        image: "facepack-100g.jpg",
        sizes: ["100G"],
        category: "face-pack",
        ingredients: [
          "Rose Extract",
          "Turmeric",
          "Neem",
          "Aloe Vera",
          "Sandalwood",
        ],
        benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow"],
      },
      {
        name: "AOS Organic Face Pack - 50G",
        description:
          "Mid-size premium organic face pack perfect for regular use. Natural ingredients for healthy, glowing skin.",
        price: 28.99,
        image: "facepack-50g.jpg",
        sizes: ["50G"],
        category: "face-pack",
        ingredients: [
          "Rose Extract",
          "Turmeric",
          "Neem",
          "Aloe Vera",
          "Sandalwood",
        ],
        benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow"],
      },
      {
        name: "AOS Organic Face Pack - 30G",
        description:
          "Travel-friendly size organic face pack. Perfect for maintaining your skincare routine on the go.",
        price: 19.99,
        image: "facepack-30g.jpg",
        sizes: ["30G"],
        category: "face-pack",
        ingredients: [
          "Rose Extract",
          "Turmeric",
          "Neem",
          "Aloe Vera",
          "Sandalwood",
        ],
        benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow"],
      },
      {
        name: "AOS Organic Face Pack - 20G",
        description:
          "Trial size organic face pack. Perfect for first-time users to experience the AOS difference.",
        price: 14.99,
        image: "facepack-20g.jpg",
        sizes: ["20G"],
        category: "face-pack",
        ingredients: [
          "Rose Extract",
          "Turmeric",
          "Neem",
          "Aloe Vera",
          "Sandalwood",
        ],
        benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow"],
      },
      {
        name: "AOS Organic Face Scrub",
        description:
          "100% natural face scrub with no side effects. Gentle exfoliation for smooth, radiant skin. 4 oz premium tube.",
        price: 32.99,
        image: "face-scrub.jpg",
        sizes: ["120g"],
        category: "scrub",
        ingredients: [
          "Coffee Grounds",
          "Coconut Oil",
          "Brown Sugar",
          "Vitamin E",
          "Essential Oils",
        ],
        benefits: [
          "Gentle Exfoliation",
          "Removes Dead Skin",
          "Improves Texture",
          "Natural Radiance",
        ],
      },
    ];

    await Product.insertMany(products);
    console.log("Products initialized");
  }
}

// API Routes

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create order
app.post("/api/orders", async (req, res) => {
  try {
    const { customer, items, total, paymentMethod } = req.body;

    // Create or find customer
    let customerDoc = await Customer.findOne({ email: customer.email });
    if (!customerDoc) {
      customerDoc = new Customer({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: {
          street: customer.address,
          city: customer.city,
          zipCode: customer.zipCode,
        },
      });
      await customerDoc.save();
    }

    // Generate order number
    const orderNumber = "AOS-" + Date.now();

    // Create order
    const order = new Order({
      orderNumber,
      customer: customerDoc._id,
      items,
      total,
      shippingAddress: {
        street: customer.address,
        city: customer.city,
        zipCode: customer.zipCode,
      },
    });

    await order.save();

    // Process payment (integrate with Stripe)
    const paymentResult = await processPayment(req.body.payment, total);

    if (paymentResult.success) {
      order.paymentStatus = "completed";
      order.paymentId = paymentResult.paymentId;
      order.status = "processing";
      await order.save();

      // Send confirmation email
      await sendOrderConfirmation(customerDoc.email, order);

      res.json({
        success: true,
        orderNumber,
        message: "Order placed successfully",
      });
    } else {
      order.paymentStatus = "failed";
      await order.save();
      res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get order by order number
app.get("/api/orders/:orderNumber", async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
      .populate("customer")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contact form submission
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Send email notification
    await sendContactNotification(name, email, message);

    res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Checkout endpoint
app.post("/checkout", (req, res) => {
  const { paymentMethod, orderDetails } = req.body;
  if (paymentMethod === "UPI") {
    db.insertPayment({ ...orderDetails, method: "UPI", status: "PENDING" });
    return res.json({ success: true, message: "Awaiting UPI confirmation" });
  }
  // existing card/Stripe logic…
});

// Payment processing function (Stripe integration)
async function processPayment(paymentData, amount) {
  try {
    // In a real implementation, you would use Stripe API
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      payment_method_data: {
        type: "card",
        card: {
          number: paymentData.cardNumber.replace(/\s/g, ""),
          exp_month: parseInt(paymentData.expiryDate.split("/")[0]),
          exp_year: parseInt("20" + paymentData.expiryDate.split("/")[1]),
          cvc: paymentData.cvv,
        },
      },
      confirm: true,
    });

    return {
      success: paymentIntent.status === "succeeded",
      paymentId: paymentIntent.id,
    };
  } catch (error) {
    console.error("Payment processing error:", error);
    return { success: false, error: error.message };
  }
}

// Email notification functions
async function sendOrderConfirmation(email, order) {
  // Implementation with nodemailer
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
            <h2>Thank you for your order!</h2>
            <p>Order Number: <strong>${order.orderNumber}</strong></p>
            <p>Total: <strong>$${order.total.toFixed(2)}</strong></p>
            <p>We will process your order and send you shipping information soon.</p>
            <br>
            <p>Best regards,<br>AOS Team</p>
        `,
  };

  await transporter.sendMail(mailOptions);
}

async function sendContactNotification(name, email, message) {
  // Implementation for contact form notifications
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Contact Form Submission",
    html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
  };

  await transporter.sendMail(mailOptions);
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`AOS E-commerce server running on port ${PORT}`);
  initializeProducts();
});

module.exports = app;
