# CEUS Website Deployment Guide

This guide covers deployment options, configuration, and best practices for deploying the CEUS website.

## Table of Contents
- [Deployment Options](#deployment-options)
- [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
- [Netlify Deployment](#netlify-deployment)
- [Self-Hosted Deployment](#self-hosted-deployment)
- [Environment Configuration](#environment-configuration)
- [Performance Optimization](#performance-optimization)
- [Monitoring and Analytics](#monitoring-and-analytics)
- [Troubleshooting](#troubleshooting)

## Deployment Options

### Recommended: Vercel
- **Best for**: Next.js applications
- **Pros**: Zero configuration, automatic deployments, global CDN
- **Cons**: Limited free tier for high traffic

### Alternative: Netlify
- **Best for**: Static sites with form handling
- **Pros**: Generous free tier, form processing
- **Cons**: Requires configuration for Next.js

### Self-Hosted
- **Best for**: Full control, custom requirements
- **Pros**: Complete control, no vendor lock-in
- **Cons**: Requires server management, higher maintenance

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Step-by-Step Deployment

#### 1. Prepare Your Repository
Ensure your repository is ready for deployment:
```bash
# Navigate to the CEUS directory
cd CEUS

# Install dependencies
npm install

# Build the project locally to test
npm run build

# Test the production build
npm start
```

#### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository

#### 3. Configure Build Settings
Vercel should auto-detect Next.js, but verify these settings:

**Build Command**: `npm run build`
**Output Directory**: `.next`
**Install Command**: `npm install`
**Node.js Version**: 18.x or later

#### 4. Environment Variables
Add these environment variables in Vercel dashboard:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

#### 5. Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your site will be available at the provided URL

### Custom Domain Setup
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_SITE_URL` environment variable

### Automatic Deployments
- **GitHub Integration**: Automatic deployments on push to main branch
- **Preview Deployments**: Automatic preview deployments for pull requests
- **Branch Deployments**: Deploy different branches to different URLs

## Netlify Deployment

### Prerequisites
- GitHub account
- Netlify account

### Step-by-Step Deployment

#### 1. Prepare Build Configuration
Create `netlify.toml` in the CEUS directory:

```toml
[build]
  base = "CEUS"
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: `CEUS`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Click "Deploy site"

#### 3. Environment Variables
Add environment variables in Netlify dashboard:
```env
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## Self-Hosted Deployment

### Option 1: Docker Deployment

#### 1. Create Dockerfile
Create `Dockerfile` in the CEUS directory:

```dockerfile
# Use Node.js 18 Alpine image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### 2. Create Docker Compose
Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  ceus-website:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=http://localhost:3000
    restart: unless-stopped
```

#### 3. Deploy with Docker
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 2: Traditional Server Deployment

#### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install nginx
sudo apt install nginx -y

# Install PM2 for process management
sudo npm install -g pm2
```

#### 2. Deploy Application
```bash
# Clone repository
git clone https://github.com/your-username/CEUS_website.git
cd CEUS_website/CEUS

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "ceus-website" -- start
pm2 save
pm2 startup
```

#### 3. Nginx Configuration
Create `/etc/nginx/sites-available/ceus-website`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets caching
    location /_next/static/ {
        alias /path/to/your/app/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/ceus-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Environment Configuration

### Required Environment Variables
```env
# Site URL (required)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form (optional)
CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id

# Social Media (optional)
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/ceus
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/ceus
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/ceus
```

### Environment-Specific Configurations

#### Development
```env
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Staging
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://staging.your-domain.com
```

#### Production
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Optimize images
npm install sharp
```

### Caching Strategy
- **Static Assets**: 1 year cache
- **HTML Pages**: 1 hour cache
- **API Responses**: 5 minutes cache

### CDN Configuration
- **Vercel**: Automatic global CDN
- **Netlify**: Automatic global CDN
- **Self-hosted**: Configure Cloudflare or similar

### Image Optimization
- Use Next.js Image component
- Optimize images before upload
- Use WebP format when possible
- Implement lazy loading

## Monitoring and Analytics

### Performance Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Core Web Vitals**: Performance metrics

### Error Tracking
- **Sentry**: Error monitoring and reporting
- **Vercel Functions**: Serverless error logging

### Uptime Monitoring
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Advanced monitoring
- **StatusCake**: Comprehensive monitoring

### Analytics Setup
1. Create Google Analytics account
2. Add tracking ID to environment variables
3. Verify tracking is working
4. Set up conversion goals

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

#### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Restart deployment after adding variables
- Check variable names for typos

#### 3D Models Not Loading
- Verify model files are in `public/` directory
- Check file paths in components
- Ensure models are optimized for web

#### Performance Issues
- Optimize images
- Enable compression
- Use CDN for static assets
- Monitor bundle size

### Debug Commands
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check build output
npm run build

# Test production build
npm start

# Check for TypeScript errors
npx tsc --noEmit

# Run linting
npm run lint
```

### Support Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Docker Documentation](https://docs.docker.com)

## Security Considerations

### HTTPS Setup
- **Vercel/Netlify**: Automatic HTTPS
- **Self-hosted**: Use Let's Encrypt for free SSL

### Security Headers
```nginx
# Add to nginx configuration
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

### Dependency Security
```bash
# Regular security audits
npm audit
npm audit fix

# Update dependencies
npm update
```

## Backup and Recovery

### Code Backup
- Use Git for version control
- Regular pushes to remote repository
- Multiple deployment environments

### Data Backup
- Export static data files
- Backup environment variables
- Document configuration

### Recovery Plan
1. Identify the issue
2. Rollback to previous deployment
3. Fix the issue in development
4. Test thoroughly
5. Redeploy

---

This deployment guide covers the most common deployment scenarios for the CEUS website. Choose the option that best fits your needs and technical requirements.
