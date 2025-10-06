// Database initialization script for AOS E-commerce
// Run this script to set up your MongoDB database with initial data

const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://vaibhavgupta2542_db_user<R@ghav123>@cluster0.ojpcabp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    initializeDatabase();
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Product Schema
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
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Initialize database with products
async function initializeDatabase() {
    try {
        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new products
        const products = [
            {
                name: "AOS Organic Face Pack - 100G",
                description: "Premium organic face pack with natural ingredients for deep cleansing and hydration. Perfect for weekly skincare routine. Our largest size offers the best value for regular users.",
                price: 45.99,
                image: "facepack-100g.jpg",
                sizes: ["100G"],
                category: "face-pack",
                ingredients: ["Rose Extract", "Turmeric", "Neem", "Aloe Vera", "Sandalwood", "Fuller's Earth", "Honey", "Glycerin"],
                benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow", "Pore Minimizing", "Oil Control"],
                stock: 50
            },
            {
                name: "AOS Organic Face Pack - 50G",
                description: "Mid-size premium organic face pack perfect for regular use. Natural ingredients for healthy, glowing skin. Ideal for monthly skincare routine.",
                price: 28.99,
                image: "facepack-50g.jpg",
                sizes: ["50G"],
                category: "face-pack",
                ingredients: ["Rose Extract", "Turmeric", "Neem", "Aloe Vera", "Sandalwood", "Fuller's Earth", "Honey", "Glycerin"],
                benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow", "Pore Minimizing", "Oil Control"],
                stock: 75
            },
            {
                name: "AOS Organic Face Pack - 30G",
                description: "Travel-friendly size organic face pack. Perfect for maintaining your skincare routine on the go. Convenient size for short trips.",
                price: 19.99,
                image: "facepack-30g.jpg",
                sizes: ["30G"],
                category: "face-pack",
                ingredients: ["Rose Extract", "Turmeric", "Neem", "Aloe Vera", "Sandalwood", "Fuller's Earth", "Honey", "Glycerin"],
                benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow", "Pore Minimizing", "Oil Control"],
                stock: 100
            },
            {
                name: "AOS Organic Face Pack - 20G",
                description: "Trial size organic face pack. Perfect for first-time users to experience the AOS difference. Great for testing skin compatibility.",
                price: 14.99,
                image: "facepack-20g.jpg",
                sizes: ["20G"],
                category: "face-pack",
                ingredients: ["Rose Extract", "Turmeric", "Neem", "Aloe Vera", "Sandalwood", "Fuller's Earth", "Honey", "Glycerin"],
                benefits: ["Deep Cleansing", "Hydration", "Anti-aging", "Natural Glow", "Pore Minimizing", "Oil Control"],
                stock: 150
            },
            {
                name: "AOS Organic Face Scrub",
                description: "100% natural face scrub with no side effects. Gentle exfoliation for smooth, radiant skin. 4 oz premium tube with natural exfoliating particles.",
                price: 32.99,
                image: "face-scrub.jpg",
                sizes: ["120g"],
                category: "scrub",
                ingredients: ["Coffee Grounds", "Coconut Oil", "Brown Sugar", "Vitamin E", "Essential Oils", "Jojoba Beads", "Shea Butter"],
                benefits: ["Gentle Exfoliation", "Removes Dead Skin", "Improves Texture", "Natural Radiance", "Moisturizing", "Anti-inflammatory"],
                stock: 80
            }
        ];

        const insertedProducts = await Product.insertMany(products);
        console.log(`Inserted ${insertedProducts.length} products successfully`);

        console.log('Database initialization completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Database initialization error:', error);
        process.exit(1);
    }
}
