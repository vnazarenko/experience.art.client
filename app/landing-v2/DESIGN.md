# Landing V2 - Design Documentation

## Overview
This is a dramatic, reference-inspired landing page design that showcases immersive art experiences through a scattered photo layout on a full black background.

## Design Approach

### Visual Hierarchy
1. **Full-Screen Hero Section**
   - Black background creates dramatic contrast
   - 8 vibrant art installation photos scattered across viewport
   - Photos positioned strategically to frame central content
   - Dynamic rotation and positioning creates visual interest

2. **Center Content**
   - Experience Art logo
   - Large "EXPERIENCE ART" heading in white
   - Welcome message with brand positioning
   - Primary CTA: "ENTER THE SITE" button with white border
   - Secondary CTA: "Explore Collections" link

3. **How It Works Section**
   - Black background continues brand consistency
   - Three-column layout with numbered steps
   - Clear value proposition

4. **Final CTA Section**
   - White background provides visual break
   - Reinforces call to action
   - Multiple paths to engagement

### Key Design Decisions

#### Photo Layout Strategy
- **Desktop**: 8 photos positioned around edges, leaving center clear
  - Corner photos: larger (20-24% width)
  - Edge photos: medium (16-19% width)
  - Rotation: -8 to +8 degrees for dynamic feel
  - Z-index layering creates depth

- **Tablet**: Adjusted positions for narrower viewport
  - Slightly larger photos (22-28% width)
  - Reduced rotation angles for stability

- **Mobile**: Optimized for vertical scroll
  - Photos pushed to edges (32-40% width)
  - Some overflow for edge-to-edge feel
  - Increased rotation for visual drama

#### Animations & Interactions
1. **Entry Animations**
   - Photos fade in with staggered delays (0.1-0.8s)
   - Scale and translate transform on entry
   - Center content fades in after photos

2. **Hover Effects**
   - Photos scale up slightly (1.05x)
   - White glow effect on hover
   - Overlay fades for full color reveal

3. **Button Interaction**
   - Background fills from left to right
   - Text color inverts on hover
   - Arrow icon slides right
   - Scale increases slightly
   - Glowing shadow effect

#### Accessibility Considerations
- High contrast white text on black background
- Focus states for keyboard navigation
- Semantic HTML structure
- Alt text for all images
- Screen reader friendly layout

#### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: >= 1024px

### Color Palette
- Background: `#000000` (Pure black)
- Primary Text: `#FFFFFF` (Pure white)
- Text Overlay: `rgba(255,255,255,0.9)` (90% white)
- Button Border: `#FFFFFF` (White)
- Dark Overlay: `rgba(0,0,0,0.4-0.6)` (Gradient for readability)

### Typography
- Heading: 48px → 96px (responsive)
- Welcome Text: 18px → 32px (responsive)
- Font Weight: Bold (700) for heading, Light (300) for body
- Letter Spacing: Tight for heading, wide for welcome text

## Technical Implementation

### Component Structure
```
app/landing-v2/
├── page.tsx              # Main page component
└── DESIGN.md            # This file

components/landing/
└── ScatteredPhotoHero.tsx  # Hero section with photo layout
```

### Key Features
1. **Client-Side Rendering**: Photos animate on mount
2. **Responsive Detection**: Screen size affects photo positioning
3. **Performance Optimized**: Lazy loading for images
4. **Smooth Transitions**: CSS transitions for all interactions

### Photos Used
All 8 photos from `/public/design/landing-photos/`:
- Eiro.jpg
- Heathen.png
- Kalliope.png
- Badillac.png
- Bonsai Baum.png
- Lady Buggies.png
- Orb.png
- Star Flu.png

## Differences from Current Landing Page

### Current (Original) Design
- Photo grid background at 0.08 opacity with grayscale
- Hero carousel slider
- White background with subtle photo overlay
- Traditional vertical sections
- Minimal animations

### New (V2) Design
- Full black background
- Scattered photos in full color around edges
- No carousel - single dramatic hero section
- Photos positioned strategically with rotation
- Extensive entry and hover animations
- More dramatic, gallery-like aesthetic
- Better alignment with reference design

## User Experience Flow

1. **Initial Load**
   - Black screen appears
   - Photos fade in sequentially from edges
   - Logo and heading appear
   - Scroll indicator bounces at bottom

2. **User Interaction**
   - Hover over photos to see glow effect
   - Primary CTA button fills with white background
   - Secondary link provides alternative path
   - Scroll to discover more content

3. **Content Discovery**
   - How It Works section explains process
   - Final CTA reinforces main action
   - Multiple entry points to experiences

## Recommendations for Future Improvements

### Phase 1 (Immediate)
- [ ] Add parallax scrolling effect to photos
- [ ] Implement photo click to view full experience
- [ ] Add video background option for hero
- [ ] Create loading skeleton for photos

### Phase 2 (Enhancement)
- [ ] A/B test button copy variations
- [ ] Add subtle particle effects in background
- [ ] Implement lazy loading intersection observer
- [ ] Add analytics tracking for photo interactions

### Phase 3 (Advanced)
- [ ] Dynamic photo selection based on user preferences
- [ ] Implement WebGL effects for premium feel
- [ ] Add sound design on interactions
- [ ] Create alternative layouts for seasonal campaigns

### Performance Optimizations
- [ ] Convert PNGs to WebP format
- [ ] Implement image CDN for faster loading
- [ ] Add blur placeholder for images
- [ ] Optimize animation performance with will-change

### Accessibility Enhancements
- [ ] Add reduced motion preference support
- [ ] Ensure color contrast meets WCAG AAA
- [ ] Add aria-labels for decorative images
- [ ] Test with screen readers

## Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Optimized layout

## File Paths
- Page: `/Users/vnazarenko/code/experience.art/experience.art.client/app/landing-v2/page.tsx`
- Hero Component: `/Users/vnazarenko/code/experience.art/experience.art.client/components/landing/ScatteredPhotoHero.tsx`
- Design System: `/Users/vnazarenko/code/experience.art/experience.art.client/app/globals.css`

## Testing Checklist
- [ ] Test on mobile devices (iOS/Android)
- [ ] Verify animation performance on lower-end devices
- [ ] Check photo loading on slow connections
- [ ] Validate keyboard navigation
- [ ] Test with screen readers
- [ ] Verify hover states on touch devices
- [ ] Check responsive breakpoints
- [ ] Test CTA button interactions
- [ ] Validate photo positioning across browsers
