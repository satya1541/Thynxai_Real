# Design Guidelines for Thynx SaaS Platform

## Design Approach
**Reference-Based Approach**: Inspired by Prisma's modern SaaS aesthetic with dark theme, bold typography, and fluid animations. This creates a premium, cutting-edge technology feel appropriate for showcasing AI-powered services.

## Core Design Elements

### Typography Hierarchy
- **Display Text**: Extra-bold, 4xl-6xl sizes for hero headlines and section titles
- **Body Text**: Regular weight, lg-xl sizes for descriptions
- **Accent Text**: Medium weight for CTAs and labels
- **Side-scrolling Text**: Outlined, massive 8xl-9xl sizes for brand value statements
- Use Google Fonts: "Inter" for UI elements, "Sora" or "Space Grotesk" for headlines

### Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm
- Section padding: py-20 to py-32 on desktop, py-12 to py-16 on mobile
- Component gaps: gap-8 to gap-12 for card grids
- Container: max-w-7xl with px-6 to px-8 horizontal padding

### Grid Structure
- Hero: Full viewport height with centered content
- Service sections: Alternating 2-column layouts (text left/right, visual right/left)
- Blog/cards: 3-column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Team: 4-column grid for portrait cards
- Footer: 4-column navigation structure

## Component Library

### Navigation
- Fixed top bar with transparent-to-solid background on scroll
- Logo left, nav links center, CTA button right
- Mobile: Hamburger menu with full-screen overlay

### Hero Section
- Full viewport (min-h-screen)
- Video background with overlay gradient
- Centered heading with glowing circular decorative elements
- Large CTA button with blur background effect
- Subtitle text beneath headline

### Service Showcase Cards (4 sections)
Each service gets dedicated full-width section:
- Split layout: 50/50 text and visual
- Service icon or illustration
- Bold service name (3xl-4xl)
- Detailed description (lg-xl)
- Feature list with checkmarks or icons
- "Learn More" CTA
- Alternate image/content sides for visual interest

### Side-Scrolling Text Banners
- Full-width, large outlined text (8xl-9xl)
- Infinite horizontal scroll animation
- Text: "INNOVATE • CREATE • TRANSFORM •" style messaging
- Two instances: one mid-page, one before footer

### Content Sections
- Statistics cards with large numbers and labels
- Video embed areas with play controls
- Partner/client logo grids (grayscale with hover effect)
- Testimonial quotes with author attribution

### Team Section
- Grid of portrait cards (circular or rounded-square images)
- Name and role beneath each portrait
- Hover effect revealing social links or bio

### Blog Section
- Featured article cards with:
  - Thumbnail image
  - Category tag
  - Headline (xl-2xl)
  - Excerpt text
  - "Read More" link
  - Publication date

### Newsletter Subscription
- Centered heading (3xl-4xl)
- Email input with inline submit button
- Privacy policy checkbox
- Decorative background elements

### Footer
- 4-column layout: Company, Products, Resources, Social
- Newsletter signup integration
- Social media icon links
- Copyright and legal links

## Animations
- Scroll-triggered fade-ins for content sections
- Continuous horizontal scroll for text banners
- Subtle hover lifts on cards (translate-y-2)
- Smooth page scroll behavior
- Video autoplay with reduced motion fallback

## Images
**Required Images**:
- **Hero**: Background video (looping, muted, futuristic tech visuals)
- **Service Sections**: 4 custom illustrations/screenshots showing each service interface
- **Content Sections**: Futuristic technology imagery, dashboard mockups
- **Team**: Professional portraits (circular crop)
- **Blog**: Article thumbnails (16:9 aspect ratio)
- **Partner Logos**: Client/partner company logos (SVG preferred)

**Image Treatment**: All images have subtle gradient overlays, rounded corners (rounded-xl to rounded-2xl), and shadow effects for depth.

## Accessibility
- Maintain WCAG AA contrast ratios throughout
- Provide video captions/transcripts
- Ensure keyboard navigation for all interactive elements
- Use semantic HTML5 structure
- Add descriptive alt text for all images