# Landing V2 - Implementation Guide

## Quick Start

Visit the new landing page at:
```
http://localhost:3000/landing-v2
```

## What's New

This landing page features a **dramatic, gallery-inspired design** with:

1. **Full Black Background** - Creates maximum contrast and drama
2. **Scattered Photo Layout** - 8 colorful art installation photos positioned dynamically
3. **No Carousel** - Single impactful hero section instead of rotating slides
4. **Enhanced Animations** - Entry animations, hover effects, and smooth transitions
5. **Responsive Design** - Optimized layouts for mobile, tablet, and desktop

## File Structure

```
app/landing-v2/
├── page.tsx              # Main landing page
├── DESIGN.md            # Detailed design documentation
└── README.md            # This file

components/landing/
└── ScatteredPhotoHero.tsx  # Hero section component
```

## Component Architecture

### Page Component (`page.tsx`)
- Server component for optimal performance
- Imports and uses `ScatteredPhotoHero` component
- Contains "How It Works" section
- Contains final CTA section
- Uses existing Header and Footer from layout

### ScatteredPhotoHero Component
- Client component (uses hooks for animations)
- Manages photo positioning across breakpoints
- Handles entry animations and interactions
- Responsive photo layout with rotation
- Center content with logo, heading, and CTA

## Design Features

### Hero Section
- **Logo**: Experience Art logo from CDN
- **Heading**: Large "EXPERIENCE ART" text (48px → 96px)
- **Welcome Message**: Brand positioning statement
- **Primary CTA**: "ENTER THE SITE" button with fill animation
- **Secondary CTA**: "Explore Collections" link
- **Scroll Indicator**: Animated arrow at bottom

### Photo Layout
- 8 photos from `/public/design/landing-photos/`
- Full color (no grayscale)
- Positioned around viewport edges
- Rotated at various angles (-10° to +12°)
- Layered with z-index for depth
- Hover effects with glow and scale

### Responsive Behavior

**Desktop (≥1024px)**
- Photos: 15-24% width
- Positioned at edges with clear center
- Subtle rotations (-8° to +8°)

**Tablet (768px-1023px)**
- Photos: 18-28% width
- Adjusted positions for narrower viewport
- Moderate rotations (-6° to +8°)

**Mobile (<768px)**
- Photos: 25-40% width
- Some overflow for edge-to-edge feel
- Stronger rotations (-10° to +12°)
- Text sizes optimized for mobile

## Customization Guide

### Changing Photos
Edit the `photoPositions` array in `ScatteredPhotoHero.tsx`:
```typescript
{
  src: '/design/landing-photos/YourPhoto.jpg',
  alt: 'Description',
  desktop: { top: '5%', left: '3%', width: '20%', rotation: -8 },
  tablet: { top: '8%', left: '2%', width: '24%', rotation: -6 },
  mobile: { top: '10%', left: '-5%', width: '35%', rotation: -10 },
  zIndex: 3,
  delay: 0.1,
}
```

### Adjusting Colors
Colors use CSS variables from `globals.css`:
- `--color-primary-black`: Background color
- `--color-primary-white`: Text and button color

### Modifying Animations
Animation timings in `ScatteredPhotoHero.tsx`:
- Entry delay: 100ms
- Staggered photo delays: 0.1s - 0.8s
- Transition duration: 1000ms
- Hover transitions: 500ms

### Button Styles
Custom button in hero uses inline styles. To modify:
- Padding: `px-12 py-5`
- Border: `border-2 border-white`
- Border radius: `rounded-full`
- Background animation: `scale-x-0 group-hover:scale-x-100`

## Integration with Existing Site

### Header & Footer
The page automatically includes:
- Header component (navigation)
- Footer component (links, social)

These are inherited from the root layout at `/app/layout.tsx`.

### Design System
Uses existing design system from `/app/globals.css`:
- Typography classes (heading-2, body-large, etc.)
- Color variables
- Container max-width
- Responsive breakpoints

### Navigation
Users can navigate to:
- `/experiences` - Browse all experiences
- `/collections` - View collections
- Standard header navigation items

## Testing Checklist

### Visual Testing
- [ ] Photos load correctly on all devices
- [ ] Text is readable on all screen sizes
- [ ] Animations play smoothly
- [ ] Hover effects work as expected
- [ ] Button interactions are responsive

### Responsive Testing
- [ ] Mobile portrait (375px)
- [ ] Mobile landscape (667px)
- [ ] Tablet portrait (768px)
- [ ] Tablet landscape (1024px)
- [ ] Desktop (1280px+)
- [ ] Large desktop (1920px+)

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing
- [ ] Images load within 2 seconds
- [ ] Animations don't cause layout shift
- [ ] No jank on scroll
- [ ] Smooth hover transitions

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG
- [ ] Alt text for images

## Deployment Notes

### Before Production
1. Optimize all images (convert to WebP)
2. Add proper meta tags for SEO
3. Set up analytics tracking
4. Test on real devices
5. Performance audit with Lighthouse

### Environment Variables
None required - all assets use public URLs or relative paths.

### CDN Assets
- Logo: Uses Webflow CDN (reliable)
- Photos: Local public folder (consider CDN for production)

## Comparison with Original Landing

| Feature | Original | Landing V2 |
|---------|----------|------------|
| Background | White with subtle photo grid | Full black |
| Photos | Grayscale, 0.08 opacity | Full color, vibrant |
| Layout | Grid background | Scattered positioning |
| Hero | Carousel slider | Single dramatic hero |
| Animations | Minimal | Extensive entry/hover |
| Text Color | Black on white | White on black |
| Photo Count | 8 (grid) | 8 (scattered) |
| CTA Style | Standard button | Animated fill button |
| Visual Impact | Subtle, clean | Bold, dramatic |

## Next Steps

### Immediate
1. Visit `/landing-v2` to see the design
2. Test responsive behavior
3. Gather user feedback
4. Compare with original at `/`

### Short Term
- A/B test against original landing page
- Optimize image loading
- Add performance monitoring
- Collect conversion metrics

### Long Term
- Consider making this the default landing
- Add personalization features
- Implement dynamic photo selection
- Create seasonal variations

## Support & Documentation

- **Design Details**: See `DESIGN.md`
- **Component Code**: `components/landing/ScatteredPhotoHero.tsx`
- **Page Code**: `app/landing-v2/page.tsx`
- **Design System**: `app/globals.css`

## Questions?

Common issues and solutions:

**Photos not loading?**
- Check `/public/design/landing-photos/` folder exists
- Verify file names match exactly (case-sensitive)

**Animations not working?**
- Check browser JavaScript is enabled
- Clear cache and reload
- Check for console errors

**Layout issues on mobile?**
- Verify viewport meta tag in layout
- Check responsive breakpoints
- Test in device emulator

**Performance issues?**
- Reduce photo file sizes
- Enable lazy loading
- Check network throttling
