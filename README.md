# PodOS - Professional Podiatrist Website

A modern, multilingual website built with Next.js for PodOS - a professional podiatrist practice in Wrocław, Poland.

## 🌟 Features

### 🌍 **Multilingual Support**

- **Polish (PL)** and **Ukrainian (UA)** languages
- Dynamic routing with locale-based paths
- Professional translations for all content

### 📱 **Modern Design**

- Responsive design for all devices
- Optimized images with WebP support
- Beautiful animations and smooth transitions
- Professional medical practice aesthetics

### 🎯 **Key Sections**

- **Hero Section** - Professional introduction and contact
- **About** - Specialist background and expertise
- **Services** - Detailed podiatric services with pricing
- **Certificates** - Professional qualifications showcase
- **Portfolio** - Before/after treatment gallery
- **Contact Form** - Integrated appointment booking
- **Location** - Interactive map and practice details

### ⚡ **Performance & SEO**

- Server-side rendering with Next.js 15
- Optimized Core Web Vitals
- SEO-friendly metadata and structured data
- Fast loading times with image optimization

### 📊 **Analytics & Tracking**

- Google Tag Manager integration
- Google Analytics 4 setup
- Custom event tracking:
  - Form submissions
  - Contact interactions
  - Social media clicks
  - Certificate views

### 🔒 **Security**

- Environment variables for sensitive data
- Secure form handling with Web3Forms
- Production-ready deployment

## 🛠️ **Tech Stack**

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **Forms**: React Hook Form
- **Analytics**: Google Tag Manager + GA4
- **Deployment**: Vercel
- **Image Optimization**: Next.js Image component
- **Internationalization**: Custom i18n implementation

## 🚀 **Getting Started**

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Brooklyn-lab/podos-next.git
cd podos-next

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Environment Variables

Create a `.env.local` file with:

```bash
# Web3Forms API Key (for contact form)
NEXT_PUBLIC_WEB3FORMS_API_KEY=your_api_key_here

# Google Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
├── sections/           # Page sections (Hero, About, etc.)
├── styles/            # Global styles and SCSS variables
├── translations/      # i18n JSON files (pl, ua)
├── utils/            # Utility functions
├── constants/        # App constants
├── types/           # TypeScript type definitions
└── hooks/          # Custom React hooks

app/
├── [locale]/       # Dynamic locale routing
└── layout.tsx     # Root layout with analytics

public/
├── images/        # Optimized images
└── favicon.ico   # Site favicon
```

## 🎨 **Key Features Implementation**

### **Multilingual Routing**

- Dynamic `[locale]` routing for PL/UA
- Middleware for locale detection
- SEO-optimized hreflang tags

### **Contact Form**

- React Hook Form validation
- Web3Forms integration for email delivery
- Success/error notification system
- Analytics event tracking

### **Image Optimization**

- WebP format with PNG fallbacks
- Responsive images with srcSet
- Lazy loading for performance

### **Analytics Integration**

- Custom event tracking system
- GDPR-friendly implementation
- Comprehensive user interaction tracking

## 🌐 **Deployment**

The website is deployed on **Vercel** with automatic deployments from the main branch.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Brooklyn-lab/podos-next)

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 📊 **Analytics Setup**

Detailed analytics configuration is available in [GTM_SETUP.md](./GTM_SETUP.md).

**Tracked Events:**

- Form submissions (success/failure)
- Contact clicks (phone/email)
- Social media interactions
- Certificate image views
- Navigation usage

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is proprietary and confidential. All rights reserved.

## 📞 **Contact**

**PodOS - Professional Podiatrist Practice**

- **Address**: Braniborska 61/13, 53-680 Wrocław, Poland
- **Phone**: +48 574 154 801
- **Email**: podoswroclaw@gmail.com
- **Website**: [podoswroclaw.pl](https://podoswroclaw.pl)

---

Built with ❤️ using Next.js and modern web technologies.
