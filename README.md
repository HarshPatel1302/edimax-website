# Edimax Creations - Digital Marketing Agency Website

A production-ready marketing website for Edimax Creations, a lifestyle-driven digital marketing agency. Built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, GSAP, and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean, premium design with charcoal, off-white, and accent gradient colors
- **Performance Optimized**: Lighthouse score ≥95 with optimized images and Core Web Vitals
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized**: Complete SEO setup with metadata, sitemap, robots.txt, and OG images
- **Responsive**: Mobile-first design that works on all devices
- **Animations**: Subtle GSAP ScrollTrigger animations with reduced motion support
- **Contact Form**: Validated contact form with rate limiting and honeypot protection
- **Type Safety**: Full TypeScript implementation with strict type checking

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Animations**: GSAP + ScrollTrigger, Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Testing**: Playwright
- **Code Quality**: ESLint + Prettier

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd edimax-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and configure your preferred email service:
   ```env
   # For Resend (recommended)
   RESEND_API_KEY=re_BdF39cWb_4PVJsq3AKvosmxSnDxbffhbf
   CONTACT_TO=edimaxcreations@gmail.com
   
   # Or for webhook integration
   CONTACT_WEBHOOK_URL=your_webhook_url_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design System

### Colors
- **Charcoal**: `#0B0D12` (Primary text and backgrounds)
- **Off-white**: `#F7F7F8` (Background and light elements)
- **Accent Gradient**: Indigo (`#4F46E5`) to Violet (`#7C3AED`)

### Typography
- **UI Font**: Inter (for body text and UI elements)
- **Display Font**: Playfair Display (for headlines)

### Layout
- 12-column grid system
- Full-bleed hero sections
- Soft shadows and rounded corners
- Ample whitespace for breathing room

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── services/          # Services pages
│   ├── contact/           # Contact page
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── metadata.ts        # SEO configuration
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Sitemap generation
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── hero.tsx          # Hero section
│   ├── navbar.tsx        # Navigation
│   ├── footer.tsx        # Footer
│   ├── section.tsx       # Section wrapper
│   ├── service-card.tsx  # Service card component
│   ├── contact-form.tsx  # Contact form
│   └── marquee-logos.tsx # Platform marquee
└── lib/                  # Utilities and configurations
    ├── constants.ts      # Content and configuration
    ├── validations.ts    # Zod schemas
    └── utils.ts          # Utility functions
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy!

3. **Configure custom domain** (optional)
   - Add your domain in Vercel dashboard
   - Update DNS records as instructed

### Environment Variables for Production

Set these in your Vercel dashboard:

```env
RESEND_API_KEY=re_BdF39cWb_4PVJsq3AKvosmxSnDxbffhbf
CONTACT_TO=edimaxcreations@gmail.com
NEXT_PUBLIC_SITE_URL=https://edimaxcreations.com
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run specific test file
npx playwright test tests/homepage.spec.ts
```

## 📊 Performance Optimization

### Lighthouse Score Tips

1. **Image Optimization**
   - Use Next.js Image component
   - Optimize images with proper formats (WebP, AVIF)
   - Implement lazy loading

2. **Font Optimization**
   - Use `next/font` for Google Fonts
   - Implement font-display: swap
   - Preload critical fonts

3. **Code Splitting**
   - Dynamic imports for heavy components
   - Lazy load non-critical animations
   - Bundle analysis with `@next/bundle-analyzer`

4. **Caching**
   - Implement proper cache headers
   - Use Vercel's edge caching
   - Optimize API routes

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Testing
npm run test             # Run Playwright tests
npm run test:ui          # Run tests with UI
```

## 📱 Responsive Design

The website is built mobile-first and includes:

- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly**: Minimum 44px touch targets
- **Readable text**: Proper font sizes and line heights
- **Optimized images**: Responsive images with proper sizing

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Focus Management**: Visible focus indicators

## 📧 Contact Form Setup

The contact form supports multiple email services:

### Option 1: Resend (Recommended)
```env
RESEND_API_KEY=re_BdF39cWb_4PVJsq3AKvosmxSnDxbffhbf
CONTACT_TO=edimaxcreations@gmail.com
```

### Option 2: Webhook Integration
```env
CONTACT_WEBHOOK_URL=your_webhook_url
```

### Option 3: SMTP
```env
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
CONTACT_TO=edimaxcreations@gmail.com
```

## 🔒 Security Features

- **Rate Limiting**: Contact form rate limiting (3 requests per 15 minutes)
- **Honeypot**: Spam protection with hidden fields
- **Input Validation**: Zod schema validation
- **XSS Protection**: Proper input sanitization
- **CSRF Protection**: Next.js built-in CSRF protection

## 📈 SEO Features

- **Metadata**: Dynamic meta tags for each page
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Structured Data**: JSON-LD for rich snippets

## 🎭 Animation Guidelines

### GSAP ScrollTrigger
- Subtle entrance animations
- Staggered card reveals
- Parallax decorative elements
- Respects `prefers-reduced-motion`

### Performance Considerations
- Use `will-change` sparingly
- Implement `transform3d` for hardware acceleration
- Avoid animating layout properties
- Use `requestAnimationFrame` for smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by Edimax Creations.

## 🆘 Support

For support and questions:
- Email: edimaxcreations@gmail.com
- Phone: +91 75062 26350
- Location: Navi Mumbai, Maharashtra

---

Built with ❤️ by Edimax Creations