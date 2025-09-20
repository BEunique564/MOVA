# AOS (Angelic Organic Spark) E-commerce Website

A fully functional e-commerce website for premium organic skincare products with integrated payment processing, order management, and customer database.

## 🌟 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with elegant gold and cream color scheme
- **Product Catalog**: Dynamic product display with detailed information
- **Shopping Cart**: Real-time cart management with quantity updates
- **Checkout System**: Secure checkout with form validation
- **Contact Form**: Customer inquiry handling
- **Smooth Animations**: Professional UI/UX with smooth transitions

### Backend Features
- **RESTful API**: Express.js server with MongoDB integration
- **Payment Processing**: Stripe payment gateway integration
- **Order Management**: Complete order lifecycle tracking
- **Customer Database**: Customer information storage and management
- **Email Notifications**: Automated order confirmations and contact form notifications
- **Security**: Rate limiting, CORS protection, and input validation

### Database Features
- **MongoDB Integration**: Scalable NoSQL database
- **Product Management**: Complete product CRUD operations
- **Order Tracking**: Order status and payment tracking
- **Customer Management**: Customer profiles and order history

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Stripe account for payment processing
- Gmail account for email notifications

### Installation

1. **Clone and Setup**
   ```bash
   # Extract all files to your project directory
   cd aos-ecommerce
   npm install
   ```

2. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env

   # Edit .env file with your configuration
   # - MongoDB connection string
   # - Stripe API keys
   # - Email credentials
   ```

3. **Database Setup**
   ```bash
   # Initialize database with products
   node db-init.js
   ```

4. **Start Development Server**
   ```bash
   # Start backend server
   npm run dev

   # Serve frontend (in another terminal)
   # Use a simple HTTP server like:
   python -m http.server 8080
   # or
   npx serve .
   ```

## 📋 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Server Configuration
PORT=3000
CLIENT_URL=http://localhost:8080

# Database
MONGODB_URI=mongodb://localhost:27017/aos_ecommerce

# Stripe Payment
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# Email (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@angelicorganicspark.com
```

## 🏗️ Project Structure

```
aos-ecommerce/
├── index.html              # Main HTML file
├── styles.css              # CSS styling
├── script.js               # Frontend JavaScript
├── server.js               # Express.js backend
├── package.json            # Node.js dependencies
├── db-init.js              # Database initialization
├── .env.example            # Environment template
├── README.md               # This file
└── public/                 # Static assets
    ├── images/
    └── uploads/
```

## 🛍️ Product Catalog

The website features AOS premium organic skincare products:

### Face Packs (Multiple Sizes)
- **100G** - Premium size ($45.99)
- **50G** - Regular size ($28.99)  
- **30G** - Travel size ($19.99)
- **20G** - Trial size ($14.99)

### Face Scrub
- **120g** - Organic face scrub ($32.99)

Each product includes:
- Detailed descriptions
- Natural ingredients list
- Key benefits
- High-quality product images
- Size options
- Stock management

## 💳 Payment Integration

### Stripe Configuration
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. Add keys to your `.env` file
4. Test with Stripe test card numbers

### Supported Features
- Credit/Debit card processing
- Secure payment handling
- Order confirmation emails
- Payment status tracking
- Refund capabilities

## 📧 Email Configuration

### Gmail SMTP Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an app-specific password
3. Use the app password in your `.env` file

### Email Features
- Order confirmation emails
- Contact form notifications
- Admin notifications
- Professional email templates

## 🔒 Security Features

- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Server-side data validation
- **Helmet.js**: Security headers protection
- **Environment Variables**: Sensitive data protection

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first CSS approach
- Tablet and desktop optimizations
- Touch-friendly interfaces
- Optimized loading times

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderNumber` - Get order details

### Contact
- `POST /api/contact` - Submit contact form

## 🚀 Deployment

### Frontend Deployment
- Deploy to Netlify, Vercel, or any static hosting
- Update API endpoints to production URLs

### Backend Deployment
- Deploy to Heroku, DigitalOcean, or AWS
- Set up production MongoDB instance
- Configure production environment variables

### Database Deployment
- Use MongoDB Atlas for cloud database
- Configure connection string in production

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Check for errors
npm run lint

# Start in production mode
npm start
```

## 📞 Support

For technical support or customization:
- Email: support@angelicorganicspark.com
- Documentation: Check inline code comments
- Issues: Create detailed bug reports

## 🔄 Updates and Maintenance

### Regular Tasks
- Update dependencies: `npm update`
- Monitor database performance
- Check payment gateway status
- Review security updates

### Customization
- Modify product data in `db-init.js`
- Update styling in `styles.css`
- Add new features in `script.js`
- Extend API in `server.js`

## 📈 Analytics and Monitoring

Consider integrating:
- Google Analytics for user tracking
- Error monitoring (Sentry)
- Performance monitoring
- Payment analytics

## 🌟 Brand Guidelines

### Color Scheme
- Primary Gold: #D4AF37
- Dark Gold: #B8941F
- Light Gold: #F4E4BC
- Cream: #F5F2E8
- Dark Brown: #3C2415

### Typography
- Headers: Playfair Display (serif)
- Body: Inter (sans-serif)

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Responsive design principles
- E-commerce best practices
- Security-first approach

---

**AOS - Angelic Organic Spark**  
*Premium Organic Skincare for the Modern Individual*