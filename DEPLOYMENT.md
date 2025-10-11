# Deployment Guide - Edimax Creations Website

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit - Edimax Creations website"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (see below)
   - Click "Deploy"

### Option 2: Deploy from CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

## 🔧 Environment Variables

Set these in your Vercel dashboard under Project Settings > Environment Variables:

### Required for Contact Form
```env
# Option 1: Resend (Recommended)
RESEND_API_KEY=your_resend_api_key_here
CONTACT_TO=edimaxcreations@gmail.com

# Option 2: Webhook Integration
CONTACT_WEBHOOK_URL=your_webhook_url_here
```

### Optional
```env
NEXT_PUBLIC_SITE_URL=https://edimaxcreations.com
NEXT_PUBLIC_SITE_NAME=Edimax Creations
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```

## 📧 Contact Form Setup

### Using Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Add to Vercel environment variables:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxx
   CONTACT_TO=edimaxcreations@gmail.com
   ```

### Using Webhook (Alternative)

1. Set up a webhook service (n8n, Zapier, Formspree)
2. Add to Vercel environment variables:
   ```env
   CONTACT_WEBHOOK_URL=https://your-webhook-url.com/contact
   ```

## 🌐 Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to Project Settings > Domains
   - Add your domain (e.g., `edimaxcreations.com`)

2. **Update DNS Records**
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.19.19`

3. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_SITE_URL=https://edimaxcreations.com
   ```

## 📊 Performance Optimization

### Lighthouse Score Optimization

1. **Enable Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```

2. **Add to layout.tsx**
   ```tsx
   import { Analytics } from '@vercel/analytics/react'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     )
   }
   ```

3. **Enable Edge Runtime** (already configured)
   - API routes use edge runtime for faster response times

## 🔍 SEO Setup

### Google Search Console

1. Add your domain to Google Search Console
2. Verify ownership using the verification code
3. Submit sitemap: `https://edimaxcreations.com/sitemap.xml`

### Social Media Meta Tags

The site includes:
- Open Graph tags for Facebook/LinkedIn
- Twitter Card tags
- Dynamic OG image generation

## 🧪 Testing

### Run Tests Locally
```bash
npm run test
```

### Run Tests in CI
The project includes Playwright tests that can be run in GitHub Actions or Vercel.

## 📈 Monitoring

### Recommended Tools

1. **Vercel Analytics** - Built-in performance monitoring
2. **Google Analytics** - User behavior tracking
3. **Google Search Console** - SEO performance
4. **Lighthouse CI** - Performance regression testing

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check TypeScript errors: `npm run type-check`
   - Check ESLint errors: `npm run lint`

2. **Contact Form Not Working**
   - Verify environment variables are set
   - Check API route logs in Vercel dashboard

3. **Images Not Loading**
   - Ensure images are in the `public` folder
   - Use Next.js Image component for optimization

### Support

For deployment issues:
- Check Vercel documentation
- Review build logs in Vercel dashboard
- Contact: edimaxcreations@gmail.com

---

**Deployment Status**: ✅ Ready for production
**Performance**: ✅ Optimized for Lighthouse ≥95
**SEO**: ✅ Complete setup with metadata, sitemap, robots.txt
**Accessibility**: ✅ WCAG compliant with proper ARIA labels
