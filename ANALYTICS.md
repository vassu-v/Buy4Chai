# Analytics & Monitoring Guide

This document outlines the analytics and monitoring setup for Buy4Chai.

## Current Setup

### Vercel Analytics
- **Status:** ✓ Active
- **Location:** Landing site (`site/src/main.jsx`)
- **Purpose:** Track page views, Core Web Vitals, and user interactions
- **Dashboard:** [Vercel Dashboard](https://vercel.com)

### SEO & Site Verification
- **Sitemap:** `public/sitemap.xml`
- **Robots:** `public/robots.txt`
- **OG Tags:** Configured in landing page meta tags
- **Schema Markup:** JSON-LD implemented for structured data
- **Google Verification:** Configured in Vercel

## Metrics to Track

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Page Performance
- **Lighthouse Score:** Target 90+
- **Time to Interactive:** < 3s
- **First Contentful Paint:** < 1.8s

### User Engagement
- **Unique Visitors:** [tracked via Vercel]
- **Page Views:** [tracked via Vercel]
- **Top Landing Sources:** [tracked via Vercel]
- **User Flow:** [tracked via Vercel]
- **Geographic Distribution:** [tracked via Vercel]

## CI/CD Monitoring

### Build & Deployment
- **GitHub Actions:** Automated build verification
- **Lighthouse CI:** Performance regression detection
- **Vercel:** Automatic deployment and monitoring

## Recommended Improvements

### Error Tracking
Consider implementing:
- **Sentry:** Production error monitoring and alerting
- **Error Reporting:** Automatic error collection from users
- **Alerts:** Email/Slack notifications for critical errors

### Advanced Analytics
- **Mixpanel or Amplitude:** Event-based analytics
- **Heatmaps:** User interaction heatmaps (Hotjar, Microsoft Clarity)
- **Session Recording:** User session playback (optional)
- **A/B Testing:** Feature flags and variant testing

### Custom Events
Track conversion metrics:
- Badge generation clicks
- Tutorial completions
- Payment gateway selections
- Configuration saves

## Accessing Dashboards

### Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select the Buy4Chai project
3. Navigate to "Analytics" tab

### Lighthouse
- Reports generated automatically on every PR and main branch push
- Accessible via GitHub Actions workflow artifacts
- GitHub checks show pass/fail status

## Alerts & Thresholds

### Performance Alerts
- Lighthouse performance score drops below 75: ⚠️
- LCP exceeds 2.5s: ⚠️
- CLS exceeds 0.1: ⚠️

### Error Alerts
- Build failures on main branch: 🔴
- Deployment failures: 🔴
- Production errors spike (when Sentry is added): 🔴

## Regular Review Schedule

- **Weekly:** Check Vercel analytics for traffic trends
- **Bi-weekly:** Review Lighthouse scores for regressions
- **Monthly:** Analyze user journey and conversion funnels
- **Quarterly:** Performance audit and optimization review
