# Complete Domain Integration Guide for AOS E-commerce Website

## 🌐 Overview
This guide will walk you through integrating your AOS e-commerce website with a custom domain, from purchasing a domain to going live with SSL certificates.

## Step 1: Domain Purchase & Setup

### Recommended Domain Names for AOS:
- `angelicorganicspark.com` (Primary recommendation)
- `aos-skincare.com`
- `aosnaturals.com`
- `angelicspark.com`

### Domain Registrars (Choose one):
1. **Namecheap** - $10-15/year
2. **GoDaddy** - $12-20/year  
3. **Google Domains** - $12/year
4. **Cloudflare Registrar** - At cost pricing

## Step 2: Hosting Setup

### Option A: Separate Frontend & Backend (Recommended)

#### Frontend Hosting - Netlify (Free)
```bash
# 1. Create account at netlify.com
# 2. Connect to GitHub/GitLab or drag & drop files
# 3. Deploy settings:
Build command: (leave empty)
Publish directory: . (root)
```

#### Backend Hosting - Heroku (Free Tier)
```bash
# 1. Install Heroku CLI
npm install -g heroku

# 2. Create Heroku app
heroku create aos-api

# 3. Add MongoDB Atlas addon
heroku addons:create mongolab:sandbox

# 4. Set environment variables
heroku config:set NODE_ENV=production
heroku config:set STRIPE_SECRET_KEY=sk_live_your_key
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
```

### Option B: All-in-One Hosting

#### DigitalOcean Droplet ($5/month)
- Full control over server
- Install Node.js, MongoDB, Nginx
- Better for custom configurations

#### AWS EC2 (Pay as you go)
- Scalable cloud hosting
- More complex setup
- Professional grade

## Step 3: Domain Configuration

### DNS Setup
Once you have your domain, configure these DNS records:

```dns
# Main website
Type: A
Name: @
Value: [Your hosting IP]

# WWW subdomain  
Type: CNAME
Name: www
Value: your-domain.com

# API subdomain (if using separate backend)
Type: A
Name: api
Value: [Your backend IP]
```

### For Netlify + Heroku Setup:
```dns
# Frontend (Netlify)
Type: CNAME
Name: @
Value: your-site.netlify.app

Type: CNAME  
Name: www
Value: your-site.netlify.app

# Backend (Heroku)
Type: CNAME
Name: api
Value: your-app.herokuapp.com
```

## Step 4: SSL Certificate Setup

### Automatic SSL (Recommended)
Most modern hosting providers offer free SSL:
- **Netlify**: Automatic SSL with Let's Encrypt
- **Heroku**: SSL certificates included
- **Cloudflare**: Free SSL proxy

### Manual SSL Setup (For custom servers)
```bash
# Using Certbot (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d angelicorganicspark.com -d www.angelicorganicspark.com
```

## Step 5: File Upload & Configuration

### Upload Your AOS Website Files

#### To Netlify:
1. **Drag & Drop Method**:
   - Zip all your files (index.html, styles.css, script.js, images)
   - Go to Netlify dashboard
   - Drag zip file to deploy area

2. **GitHub Method**:
   ```bash
   # Create GitHub repository
   git init
   git add .
   git commit -m "Initial AOS website"
   git remote add origin https://github.com/yourusername/aos-website.git
   git push -u origin main
   
   # Connect to Netlify via GitHub
   ```

#### To Heroku (Backend):
```bash
# Deploy backend files
git add .
git commit -m "Deploy AOS backend"
git push heroku main

# Initialize database
heroku run node db-init.js
```

## Step 6: Environment Configuration

### Update API URLs in Frontend
Edit your `script.js` file:

```javascript
// Change from localhost to your live API
const API_BASE_URL = 'https://api.angelicorganicspark.com';
// or
const API_BASE_URL = 'https://your-app.herokuapp.com';
```

### Production Environment Variables
```env
# Backend (.env on Heroku)
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aos_ecommerce
STRIPE_SECRET_KEY=sk_live_your_live_key
CLIENT_URL=https://angelicorganicspark.com
EMAIL_USER=orders@angelicorganicspark.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@angelicorganicspark.com
```

## Step 7: Database Setup (MongoDB Atlas)

### Create Production Database:
1. **Sign up at MongoDB Atlas** (free tier)
2. **Create Cluster**:
   - Choose free tier (M0)
   - Select region closest to your users
   - Create cluster

3. **Database Access**:
   - Create database user
   - Generate strong password
   - Note username/password

4. **Network Access**:
   - Add IP addresses (0.0.0.0/0 for all IPs)
   - Or specific IPs for security

5. **Get Connection String**:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/aos_ecommerce?retryWrites=true&w=majority
   ```

## Step 8: Payment Gateway Setup

### Stripe Live Mode:
1. **Activate Stripe Account**:
   - Complete business verification
   - Add bank account details
   - Get live API keys

2. **Update Keys**:
   ```javascript
   // Frontend - replace test keys with live keys
   const STRIPE_PUBLISHABLE_KEY = 'pk_live_your_live_key';
   ```

3. **Webhook Setup**:
   ```bash
   # Add webhook endpoint in Stripe dashboard
   Endpoint URL: https://api.angelicorganicspark.com/webhooks/stripe
   Events: payment_intent.succeeded, payment_intent.payment_failed
   ```

## Step 9: Email Configuration

### Professional Email Setup:
1. **Google Workspace** ($6/month per user):
   - admin@angelicorganicspark.com
   - orders@angelicorganicspark.com
   - support@angelicorganicspark.com

2. **Gmail SMTP Setup**:
   ```env
   EMAIL_USER=orders@angelicorganicspark.com
   EMAIL_PASS=your-app-specific-password
   ```

## Step 10: Testing & Launch

### Pre-Launch Checklist:
```checklist
□ Domain points to hosting
□ SSL certificate active (https://)
□ All pages load correctly
□ Contact form sends emails
□ Shopping cart functions
□ Payment processing works (test with small amount)
□ Order confirmation emails sent
□ Mobile responsive design
□ Fast loading times (<3 seconds)
□ SEO meta tags added
□ Google Analytics installed
□ Error pages setup (404, 500)
```

### Test Payment Flow:
1. Add items to cart
2. Proceed to checkout
3. Use test card: 4242 4242 4242 4242
4. Complete order
5. Check email confirmation
6. Verify order in database

## Step 11: Post-Launch Setup

### Analytics & Monitoring:
```html
<!-- Add to index.html head -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### SEO Optimization:
```html
<!-- Update meta tags in index.html -->
<title>AOS - Premium Organic Skincare | Angelic Organic Spark</title>
<meta name="description" content="Discover premium organic skincare with AOS face packs and scrubs. 100% natural ingredients, luxury packaging, and proven results.">
<meta name="keywords" content="organic skincare, face pack, face scrub, natural cosmetics, AOS">
```

### Security Headers:
```javascript
// Add to server.js
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

## Step 12: Backup & Maintenance

### Automated Backups:
1. **Database**: MongoDB Atlas automatic backups
2. **Code**: GitHub repository
3. **Files**: Regular downloads of uploads folder

### Regular Maintenance:
- Update dependencies monthly: `npm update`
- Monitor server logs
- Check SSL certificate renewal
- Review payment gateway reports
- Update product inventory

## Quick Start Commands

### Deploy Everything:
```bash
# 1. Backend to Heroku
git clone your-repo
cd aos-ecommerce
heroku create aos-api
git push heroku main
heroku run node db-init.js

# 2. Frontend to Netlify
# Upload files via web interface or connect GitHub

# 3. Update DNS records
# Point domain to hosting providers

# 4. Test everything
# Visit https://angelicorganicspark.com
```

## Cost Breakdown (Monthly)

### Minimal Setup:
- Domain: $1-2/month
- Netlify: Free
- Heroku: Free (hobby tier)
- MongoDB Atlas: Free (M0 tier)
- **Total: ~$2/month**

### Professional Setup:
- Domain: $1-2/month
- Hosting: $5-20/month
- Database: $9/month (M2 tier)
- Email: $6/month (Google Workspace)
- **Total: ~$25/month**

## Support & Troubleshooting

### Common Issues:
1. **DNS not propagating**: Wait 24-48 hours
2. **SSL not working**: Check domain configuration
3. **API not connecting**: Verify CORS settings
4. **Payments failing**: Check Stripe webhook setup
5. **Emails not sending**: Verify SMTP credentials

### Need Help?
- Check hosting provider documentation
- Use browser developer tools for debugging
- Test on different devices and browsers
- Monitor server logs for errors

---

🎉 **Congratulations!** Your AOS e-commerce website is now live on your custom domain with professional hosting, SSL security, and payment processing ready for customers worldwide!