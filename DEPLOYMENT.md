# Deployment Configurations for AOS E-commerce

## Heroku Deployment (Backend)

### 1. Heroku Setup
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create new app
heroku create aos-ecommerce-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set STRIPE_SECRET_KEY=your_stripe_secret
heroku config:set EMAIL_USER=your_email
heroku config:set EMAIL_PASS=your_app_password
```

### 2. Procfile
```
web: node server.js
```

### 3. Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

## Netlify Deployment (Frontend)

### 1. Build Configuration
Create `netlify.toml`:
```toml
[build]
  publish = "."

[[redirects]]
  from = "/api/*"
  to = "https://your-heroku-app.herokuapp.com/api/:splat"
  status = 200
  force = true
```

### 2. Environment Variables
Set in Netlify dashboard:
- `REACT_APP_API_URL=https://your-heroku-app.herokuapp.com`

## MongoDB Atlas Setup

### 1. Create Cluster
- Sign up at mongodb.com/atlas
- Create free tier cluster
- Set up database user
- Configure network access

### 2. Connection String
```
mongodb+srv://username:password@cluster.mongodb.net/aos_ecommerce
```

## Domain Configuration

### 1. Custom Domain
- Purchase domain (e.g., angelicorganicspark.com)
- Configure DNS records
- Set up SSL certificates

### 2. Subdomain Structure
- www.angelicorganicspark.com (frontend)
- api.angelicorganicspark.com (backend)
- admin.angelicorganicspark.com (admin panel)

## Performance Optimization

### 1. Frontend
- Enable Gzip compression
- Optimize images
- Minify CSS/JS
- Use CDN for assets

### 2. Backend
- Enable MongoDB indexes
- Implement caching
- Use connection pooling
- Monitor response times

## Security Checklist

### Production Security
- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Input validation implemented
- [ ] CORS properly configured
- [ ] Database access restricted
- [ ] Error logging enabled
- [ ] Security headers set

## Monitoring Setup

### 1. Error Tracking
```bash
npm install @sentry/node
```

### 2. Performance Monitoring
- New Relic
- DataDog
- Custom metrics

### 3. Uptime Monitoring
- Pingdom
- UptimeRobot
- StatusPage

## Backup Strategy

### 1. Database Backups
- MongoDB Atlas automatic backups
- Manual backup scripts
- Test restore procedures

### 2. Code Backups
- Git repositories
- Multiple branches
- Tagged releases

## Scaling Considerations

### 1. Horizontal Scaling
- Load balancers
- Multiple server instances
- Database clustering

### 2. Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching layers