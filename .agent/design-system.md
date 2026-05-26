# Design System & Styling Guidelines

> **Last Updated**: 2026-02-02  
> **Project**: Abhinand's Portfolio Website

This document serves as the single source of truth for all design and styling decisions made throughout the project.

---

## Color Palette

### Dark Mode (Default)
```css
/* Backgrounds */
--bg-primary: linear-gradient(to top, #030712, #000000)  /* gray-950 to black */
--bg-card: linear-gradient(to bottom right, rgba(17, 24, 39, 0.5), rgba(3, 7, 18, 0.5))  /* gray-900/50 to gray-950/50 */
--bg-overlay: rgba(0, 0, 0, 0.8)

/* Text */
--text-primary: #ffffff
--text-secondary: #d1d5db  /* gray-300 */
--text-tertiary: #9ca3af   /* gray-400 */
--text-muted: #6b7280      /* gray-500 */
--text-subtle: #4b5563     /* gray-600 */

/* Borders */
--border-primary: #1f2937  /* gray-800 */
--border-secondary: #374151 /* gray-700 */

/* Accents - INDIGO */
--accent-primary: #818cf8   /* indigo-400 */
--accent-secondary: #6366f1 /* indigo-500 */
--accent-tertiary: #4f46e5  /* indigo-600 */
--accent-light: #a5b4fc     /* indigo-300 */
--accent-glow: rgba(129, 140, 248, 0.3)

/* Chips */
--chip-bg: #ffffff
--chip-text: #000000
```

### Light Mode
```css
/* Backgrounds */
--bg-primary: linear-gradient(to bottom, #f9fafb, #ffffff)  /* gray-50 to white */
--bg-card: #ffffff
--bg-overlay: rgba(0, 0, 0, 0.4)

/* Text */
--text-primary: #111827     /* gray-900 */
--text-secondary: #374151   /* gray-700 */
--text-tertiary: #4b5563    /* gray-600 */
--text-muted: #6b7280       /* gray-500 */

/* Borders */
--border-primary: #e5e7eb   /* gray-200 */
--border-secondary: #d1d5db /* gray-300 */

/* Accents - VIOLET */
--accent-primary: #8b5cf6   /* violet-600 */
--accent-secondary: #7c3aed /* violet-700 */
--accent-tertiary: #6d28d9  /* violet-800 */
--accent-light: #a78bfa     /* violet-500 */
--accent-glow: rgba(139, 92, 246, 0.3)

/* Chips */
--chip-bg: #111827          /* gray-900 */
--chip-text: #ffffff
```

### Random Colors (Timeline Dots & Category Indicators)
Used for visual variety across timeline items and skill categories:

```javascript
const colors = {
  rose: {
    bg: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.5)'
  },
  amber: {
    bg: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.5)'
  },
  cyan: {
    bg: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.5)'
  },
  blue: {
    bg: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.5)'
  },
  purple: {
    bg: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.5)'
  },
  pink: {
    bg: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.5)'
  },
  green: {
    bg: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.5)'
  },
  orange: {
    bg: '#f97316',
    glow: 'rgba(249, 115, 22, 0.5)'
  },
  teal: {
    bg: '#2dd4bf',
    glow: 'rgba(45, 212, 191, 0.5)'
  },
  lime: {
    bg: '#a3e635',
    glow: 'rgba(163, 230, 53, 0.5)'
  },
  sky: {
    bg: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.5)'
  },
  emerald: {
    bg: '#10b981',
    glow: 'rgba(16, 185, 129, 0.5)'
  },
  yellow: {
    bg: '#facc15',
    glow: 'rgba(250, 204, 21, 0.5)'
  }
}
```

**Color Order**: `['rose', 'amber', 'cyan', 'blue', 'purple', 'pink', 'green', 'orange', 'teal', 'lime', 'sky', 'emerald', 'yellow']`

**Usage**: Colors cycle through array using `index % colors.length`

**Total Colors**: 13 vibrant colors for maximum visual variety

---

## Typography

### Font Families
- **Primary**: System font stack (default Tailwind)
- **Weight**: Light (300) for headers, Medium (500) for emphasis

### Text Sizes
```css
/* Headers */
--text-5xl: 3rem      /* 48px - Main page headers */
--text-4xl: 2.25rem   /* 36px - Main page headers (mobile) */
--text-2xl: 1.5rem    /* 24px - Modal titles */
--text-xl: 1.25rem    /* 20px - Category headers */
--text-lg: 1.125rem   /* 18px - Timeline position titles */

/* Body */
--text-sm: 0.875rem   /* 14px - Body text, labels */
--text-xs: 0.75rem    /* 12px - Chips, metadata */
```

### Font Weights
- **Light (300)**: Page headers, body text
- **Medium (500)**: Position titles, category headers
- **Semibold (600)**: Modal titles
- **Bold (700)**: Technology chips (dark mode only)

---

## Spacing System

### Padding
```css
/* Chips */
--chip-padding: 1rem 1rem  /* px-4 py-2 */

/* Cards */
--card-padding: 1.5rem     /* p-6 */

/* Modal */
--modal-padding: 2rem      /* p-8 (mobile) */
--modal-padding-lg: 3rem   /* p-12 (desktop) */

/* Page */
--page-padding-y: 5rem     /* py-20 */
--page-padding-x: 1rem     /* px-4 */
```

### Gaps
```css
--gap-chips: 0.5rem        /* gap-2 */
--gap-cards: 2rem          /* gap-8 */
--gap-timeline: 2rem       /* gap-8 */
```

### Margins
```css
--header-margin: 5rem      /* mb-20 */
--section-margin: 2rem     /* mb-8 */
--element-margin: 1rem     /* mb-4 */
```

---

## Component Patterns

### Chips (Technology Badges)
**Design Philosophy**: Flat, pill-shaped, high contrast

```jsx
// Dark Mode
className="px-4 py-2 bg-white text-black text-xs font-medium rounded-full"

// Light Mode
className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-full"

// Hover
hover:scale-105 hover:shadow-lg
```

**Key Decisions**:
- ✅ Fully rounded (`rounded-full`)
- ✅ No borders (flat design)
- ✅ Inverted colors between themes
- ✅ Subtle scale on hover (1.05x)
- ❌ No neon glow effects on chips

### Cards (Skill Categories)
```jsx
// Dark Mode
className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800 rounded-lg p-6"

// Light Mode
className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"

// Hover
hover:border-gray-700  // dark
hover:border-gray-300 hover:shadow-md  // light
```

### Timeline Dots
```jsx
className="w-3 h-3 rounded-full bg-{color} shadow-[0_0_10px_rgba(...)]"
```

**Key Decisions**:
- Size: 12px (w-3 h-3)
- Random colors from palette
- Glow effect matches dot color
- Scale animation on hover (1.5x)

### Buttons
```jsx
// Navigation Arrows (Dark)
className="w-12 h-12 bg-gray-800/50 border border-gray-700 text-gray-400 
           hover:bg-gray-700 hover:border-cyan-500/50 hover:text-cyan-400 
           hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"

// Navigation Arrows (Light)
className="w-12 h-12 bg-white/90 border border-gray-300 text-gray-600
           hover:bg-gray-50 hover:border-blue-500/50 hover:text-blue-600
           hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"

// Theme Toggle (Dark)
className="w-12 h-12 bg-gray-800/50 border border-gray-700 text-yellow-400
           hover:bg-gray-700 hover:border-yellow-500/50
           hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]"

// Theme Toggle (Light)
className="w-12 h-12 bg-white/90 border border-gray-300 text-gray-700
           hover:bg-gray-100 hover:border-blue-500/50
           hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
```

**Common Patterns**:
- Rounded: `rounded-full` for buttons
- Backdrop blur: `backdrop-blur-sm`
- Size: 48px × 48px (w-12 h-12)
- Transition: `transition-all duration-300`

---

## Animation Guidelines

### Transitions
```css
/* Default */
transition-all duration-300

/* Colors only */
transition-colors duration-300

/* Transform only */
transition-transform duration-300
```

### GSAP Animations

#### Entry Animations
```javascript
// Headers
gsap.fromTo(element, 
  { opacity: 0, y: -30 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
)

// Timeline line
gsap.fromTo(element,
  { scaleX: 0, transformOrigin: 'left' },
  { scaleX: 1, duration: 1, ease: 'power2.out' }
)

// Timeline items
gsap.fromTo(elements,
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
)

// Skill chips
gsap.fromTo(chips,
  { opacity: 0, scale: 0.8 },
  { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: 'back.out(1.5)' }
)
```

#### Exit Animations
```javascript
gsap.to(elements, {
  opacity: 0,
  y: 20,
  duration: 0.4,
  ease: 'power2.in',
  stagger: 0.05
})
```

#### Hover Animations
```javascript
// Timeline dot scale
onMouseEnter: scale: 1.5, duration: 0.3, ease: 'back.out(1.7)'
onMouseLeave: scale: 1, duration: 0.3, ease: 'power2.out'
```

---

## Layout Patterns

### Page Structure
```jsx
<div className="w-full min-h-screen py-20 px-4 bg-gradient-to-t from-gray-950 to-black">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</div>
```

**Key Decisions**:
- Max width: 1280px (`max-w-7xl`)
- Vertical padding: 80px (`py-20`)
- Horizontal padding: 16px (`px-4`)
- Full viewport height minimum

### Grid Systems
```jsx
// Timeline (Experience)
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"

// Skills Categories
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
```

**Breakpoints**:
- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3-4 columns

---

## Hover Effects

### Text Glow
```jsx
// Dark Mode
group-hover:text-cyan-400 
group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]

// Light Mode
group-hover:text-blue-600
group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]
```

### Shadow Glow
```jsx
// Dark Mode - Cyan
hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]

// Light Mode - Blue
hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]

// Theme Toggle - Yellow (Dark)
hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]
```

### Scale Effects
```jsx
// Chips
hover:scale-105

// Timeline dots
hover: scale: 1.5 (via GSAP)

// Navigation arrows
hover:-translate-x-0.5  // left arrow
hover:translate-x-0.5   // right arrow
```

---

## Accessibility Standards

### ARIA Labels
- All buttons have `aria-label`
- Interactive elements have descriptive labels
- Theme toggle announces current mode

### Color Contrast
- **Dark Mode**: White text on dark backgrounds (WCAG AAA)
- **Light Mode**: Dark text on light backgrounds (WCAG AAA)
- **Chips**: High contrast in both modes

### Focus States
- All interactive elements have visible focus states
- Focus indicators use theme-appropriate colors

### Keyboard Navigation
- All buttons are keyboard accessible
- Tab order follows visual flow
- Enter/Space activate buttons

---

## Theme System

### State Management
```javascript
const [isDarkMode, setIsDarkMode] = useState(true);
const toggleTheme = () => setIsDarkMode(!isDarkMode);
```

### Prop Passing
```
App (isDarkMode)
├── Experience (isDarkMode, isActive)
│   └── Modal (isDarkMode)
└── Skills (isDarkMode, isActive)
```

### Conditional Styling Pattern
```jsx
className={`base-classes ${
  isDarkMode 
    ? 'dark-mode-classes' 
    : 'light-mode-classes'
}`}
```

---

## File Organization

### Component Structure
```
src/
├── components/
│   ├── Experience.jsx    # Timeline with random colored dots
│   ├── Skills.jsx        # Categories with random colored indicators
│   ├── Modal.jsx         # Experience details modal
│   └── ...
├── data.js               # All content data
└── App.jsx               # Main app with theme state
```

### Data Structure
```javascript
// Experience
{
  id: number,
  title: string,
  company: string,
  period: string,
  location: string,
  description: string,
  responsibilities: string[],
  technologies: string[],
  projects: [{ name: string, description: string }]
}

// Skills
{
  category: string,
  skills: [{ name: string, url: string }]
}
```

---

## Design Principles

### Minimalism
- Clean, uncluttered layouts
- Ample white space
- Light font weights (300)
- Subtle borders and shadows

### Consistency
- Same spacing patterns across components
- Unified color palette
- Consistent animation timings
- Matching hover effects

### Accessibility First
- High contrast ratios
- Keyboard navigable
- Semantic HTML
- Descriptive labels

### Performance
- Smooth 60fps animations
- Optimized GSAP usage
- Efficient re-renders
- Minimal layout shifts

### Visual Hierarchy
- Large, light headers
- Clear section separation
- Color for emphasis
- Size for importance

---

## Future Considerations

### Potential Additions
- [ ] Theme persistence (localStorage)
- [ ] System theme detection
- [ ] Custom color picker
- [ ] Animation preferences
- [ ] Reduced motion support

### Maintenance Notes
- Update this document when making design changes
- Keep color palette consistent
- Test new components in both themes
- Verify accessibility on changes

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-02  
**Maintained By**: Development Team

## Projects Component Pattern

### Project Cards (Thumbnail Grid)
```jsx
// Dark Mode
className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800 hover:border-gray-700"

// Light Mode
className="bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
```

**Key Features**:
- Aspect ratio: 16:9 (aspect-video)
- Thumbnail with scale effect on hover (1.1x)
- Image count badge for multiple images
- Tech stack preview (max 3 chips)
- Link indicators (GitHub, Live, LinkedIn)
- Bottom gradient bar on hover

### Project Modal
```jsx
// Full-featured modal with:
- Image gallery with navigation
- Full-screen image viewer
- Project details (description, features, stack)
- External links (GitHub, Live Demo, LinkedIn)
```

**Image Gallery**:
- Aspect ratio: 16:9
- Navigation: Previous/Next buttons
- Dot indicators for current image
- Click to open full-screen view
- Full-screen overlay with close button

**Layout**:
- Max width: 1024px (max-w-4xl)
- Padding: 32px mobile, 48px desktop
- Features in 2-column grid on desktop

### Data Structure
```javascript
{
  id: number,
  name: string,
  thumbnail: string,  // 800x600 recommended
  images: string[],   // 1-4 images, 1200x800 recommended
  description: string,
  features: string[],
  stack: string[],
  githubLink: string,
  liveLink: string,
  linkedinLink: string
}
```

---

**Updated**: 2026-02-02  
**Component**: Projects.jsx, ProjectModal.jsx

## About Component Pattern

### Photo Stack Component
**Design Philosophy**: Interactive photo gallery with GSAP-powered animations

```jsx
// Photo Stack Container
className="relative w-full max-w-md aspect-[3/4]"

// Individual Photos
- Positioned absolutely, stacked on top of each other
- Fan rotation: (index - 1.5) * 3 degrees
- Active photo: scale 1.05, elevated with glow shadow
- Inactive photos: scale 1, standard shadow
- Border: 4px solid, theme-aware
```

**Animations**:
- Entry: Stagger animation with back.out(1.2) ease
- Rotation: Fan spread effect on load
- Active state: Scale + elevation + glow shadow
- Auto-rotate: 3-second interval
- Click: Manual photo selection

**Photo Indicators**:
- Dot navigation below stack
- Active: Elongated (w-6), accent color
- Inactive: Small (w-2), muted color

### Contact Card
```jsx
// Dark Mode
className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800"

// Light Mode
className="bg-white border border-gray-200 shadow-sm"
```

**Contact Items**:
- Icon + text layout
- Hover: Accent color transition
- Icons: 20px (w-5 h-5)
- Text: Small (text-sm), light weight

### Social Links Grid
```jsx
// 2-column grid on all sizes
className="grid grid-cols-2 gap-4"

// Individual Link Cards
- Icon + label layout
- Padding: 16px (p-4)
- Hover: Background + border + text color change
- Icons: 24px (w-6 h-6)
```

**Social Platforms**:
- GitHub
- LinkedIn
- Twitter
- Instagram

### Data Structure
```javascript
{
  name: string,
  title: string,
  bio: string,  // Long-form paragraph
  photos: string[],  // 4 photos, 600x800 recommended
  contact: {
    email: string,
    phone: string,
    location: string
  },
  social: {
    github: string,
    linkedin: string,
    twitter: string,
    instagram: string
  }
}
```

### Layout Pattern
- **Grid**: 2 columns on desktop (lg:grid-cols-2)
- **Left**: Photo stack (max-w-md, aspect-[3/4])
- **Right**: Bio + Contact + Social (space-y-8)
- **Gap**: 48px on desktop (lg:gap-16)

---

**Updated**: 2026-02-02  
**Component**: About.jsx

## Education Component Pattern

### Degree Cards
**Design Philosophy**: Large, detailed cards for academic degrees

```jsx
// Full-width cards with detailed information
className="p-6 md:p-8 rounded-lg border"

// Dark Mode
className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800 hover:border-gray-700"

// Light Mode
className="bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
```

**Content Structure**:
- Degree name (text-xl, font-medium)
- Institution (text-lg, accent color)
- Location, period, GPA (text-sm, muted)
- Description paragraph
- Achievements list (2-column grid on desktop)

### Course Cards
**Design Philosophy**: Compact grid cards for courses

```jsx
// 3-column grid on desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Individual cards
- Course name with hover effect
- Provider and instructor
- Completion date
- Skills chips (tech stack)
- Certificate link
```

**Animations**:
- Scale animation on entry (scale: 0.95  1)
- back.out(1.2) easing for bounce effect
- Stagger: 0.05s between cards

### Certification Cards
**Design Philosophy**: Badge-style cards with verification

```jsx
// 3-column grid layout
// Icon + content layout
- Badge icon in colored background
- Certification name
- Issuer
- Issue/expiry dates
- Credential ID (monospace font)
- Verify link
```

**Icon Styling**:
```jsx
// Icon container
className="p-2 rounded-lg bg-cyan-400/10" // dark
className="p-2 rounded-lg bg-blue-600/10" // light

// Icon
className="w-6 h-6 text-cyan-400" // dark
className="w-6 h-6 text-blue-600" // light
```

### Data Structure
```javascript
{
  degrees: [
    {
      id: number,
      degree: string,
      institution: string,
      location: string,
      period: string,
      gpa: string,
      description: string,
      achievements: string[]
    }
  ],
  courses: [
    {
      id: number,
      name: string,
      provider: string,
      instructor: string,
      completed: string,
      certificate: string,
      skills: string[]
    }
  ],
  certifications: [
    {
      id: number,
      name: string,
      issuer: string,
      issued: string,
      expires: string,
      credentialId: string,
      verifyUrl: string
    }
  ]
}
```

### Section Layout
- **Degrees**: Vertical stack, full-width cards
- **Courses**: 3-column grid
- **Certifications**: 3-column grid
- **Spacing**: 16px gap between sections (mb-16)

### Animation Sequence
1. Header: Fade in from top (0.6s)
2. Sections: Stagger fade in (0.2s delay between)
3. Degree cards: Slide from left (0.15s stagger)
4. Course cards: Scale up (0.05s stagger)
5. Cert cards: Fade up (0.1s stagger)

---

**Updated**: 2026-02-02  
**Component**: Education.jsx
