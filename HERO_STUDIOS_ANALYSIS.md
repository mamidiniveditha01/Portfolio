# Hero Studios Typography & Animation Analysis

## Typography System

### Font Family
- **Serif Display Font**: Appears to be a high-contrast serif (possibly Didot, Bodoni, or similar)
- Used for all project titles and main headlines
- Elegant, editorial, premium feel

### Typography Hierarchy

**Project Titles (H2/H3)**
- Very large size (appears to be 48px-72px+)
- Bold weight (700-900)
- High contrast serif font
- Light gray color (#999999 or similar) for secondary projects
- Black/dark color for featured projects
- Generous line height (1.2-1.3)
- Letter spacing: 0.02em-0.03em

**Project Subtitle/Category**
- Small uppercase text (12px-14px)
- Regular weight (400-500)
- Letter spacing: 0.05em-0.1em
- Color: Medium gray (#666666)
- Positioned above or below main title

**Project Description**
- Medium size (16px-18px)
- Regular weight (400)
- Light gray color
- Positioned to the right or below title

### Color Scheme
- **Background**: White or very light gray
- **Primary Text**: Dark gray or black (#1a1a1a, #333333)
- **Secondary Text**: Medium gray (#666666, #999999)
- **Accent**: Bright neon green (#00FF00) or similar for interactive elements

---

## Animation Patterns

### Project Card Hover Animation
1. **Entrance Animation**: Cards fade in and slide up as user scrolls into view
   - Duration: 600-800ms
   - Easing: Smooth ease-out
   - Stagger: 100-150ms between items

2. **Hover State Animation**:
   - **Scale**: Subtle scale up (1.02-1.05x)
   - **Opacity**: Slight increase in opacity
   - **Color Shift**: Text color may shift or accent color appears
   - **Duration**: 300-400ms
   - **Easing**: Smooth cubic-bezier

3. **Border/Frame Animation**:
   - Dashed border around project cards
   - Border may animate in on hover (stroke animation)
   - Color changes from gray to accent color
   - Duration: 300-500ms

### Scroll-Triggered Reveals
- Projects appear to have staggered entrance animations as user scrolls
- Each project card animates in sequence
- Fade + slide-up combination
- Parallax effect on text (text moves slower than background)

### Layout Pattern
- **Grid Structure**: Asymmetrical layout (not uniform grid)
- **Card Sizing**: Variable sizes (some cards larger than others)
- **Spacing**: Large gaps between cards (48px-64px)
- **Border**: Dashed border frames around each project

---

## Implementation Strategy for Niveditha

### Typography Updates
1. Replace Playfair Display with a high-contrast serif (Bodoni, Didot, or Cormorant)
2. Increase font sizes for project titles (64px-80px)
3. Use light gray for secondary projects, dark for featured
4. Add uppercase category labels with high letter spacing
5. Maintain generous line heights (1.2-1.3)

### Animation Implementation
1. **Scroll-Triggered Reveals**: Use Framer Motion's `whileInView` for staggered animations
2. **Hover Effects**: Scale + opacity + color shift on hover
3. **Border Animation**: Animate dashed border stroke on hover
4. **Stagger Timing**: 100-150ms between each project card
5. **Motion Duration**: 600-800ms for entrance, 300-400ms for hover

### Layout Structure
1. Asymmetrical grid (not uniform)
2. Variable card sizes
3. Dashed borders around cards
4. Large spacing between sections
5. Project category labels above titles
6. Subtitle/description text positioned strategically

---

## CSS/Motion Details

### Easing Functions
- **Entrance**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (ease-out with slight bounce)
- **Hover**: `cubic-bezier(0.23, 1, 0.32, 1)` (snappy ease-out)
- **Scroll**: `cubic-bezier(0.77, 0, 0.175, 1)` (smooth ease-in-out)

### Animation Timings
- Entrance: 600-800ms
- Hover: 300-400ms
- Stagger: 100-150ms per item
- Scroll parallax: Subtle, 0.3-0.5x speed

### Border Animation
- Dashed border: `4px dashed #999999`
- On hover: `4px dashed #9B7EBD` (accent color)
- Stroke animation: Animate `stroke-dashoffset` for flowing effect

### Color Transitions
- Text color on hover: #2D2D3D → #9B7EBD
- Border color on hover: #999999 → #9B7EBD
- Opacity increase: 0.7 → 1.0
- Duration: 300-400ms
