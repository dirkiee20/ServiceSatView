# Customer Service Satisfaction Website - Design Guidelines

## Design Approach

**Selected System**: Material Design with dashboard-focused patterns
**Rationale**: This utility-focused application requires clear data hierarchy, intuitive forms, and professional data visualization. Material Design provides excellent patterns for forms, cards, and data displays while maintaining accessibility and usability.

**Key Design Principles**:
- Data clarity over decoration
- Professional, trustworthy aesthetic
- Immediate feedback visibility
- Scannable information architecture

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16, 24** (e.g., p-4, gap-6, m-8, py-12)

**Primary Layout Pattern**: Dashboard split-view
- Left sidebar navigation (280px width) with sections: Submit Feedback, View Results, About
- Main content area with generous padding (px-8 lg:px-12)
- Container max-width: max-w-7xl for dashboard content
- Form containers: max-w-2xl for optimal input experience

**Grid Structure**:
- Results dashboard: 2-column grid on desktop (grid-cols-2), single column on mobile
- Stat cards: 3-4 columns for key metrics (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Recent feedback: Single column list with card layout

---

## Typography

**Font Selection**: Inter (Google Fonts) - excellent for UI and data displays

**Hierarchy**:
- Page titles: text-3xl font-bold (Dashboard section headers)
- Section headers: text-2xl font-semibold (Chart titles, form sections)
- Card titles: text-lg font-medium (Individual stat labels)
- Body text: text-base (Form labels, feedback comments)
- Supporting text: text-sm text-gray-600 (Timestamps, metadata)
- Micro-labels: text-xs font-medium uppercase tracking-wide (Category tags)

---

## Component Library

### Navigation & Structure
**Sidebar Navigation**:
- Fixed left sidebar with subtle border-right
- Logo/brand at top with icon + text
- Navigation items with icon-left alignment, hover states with subtle background
- Active state: Background fill with accent indicator (left border)

**Top Bar** (for mobile):
- Hamburger menu triggering slide-in navigation
- Brand logo centered
- Height: h-16

### Feedback Submission Form
**Rating Component**:
- Large star rating interface (5 stars, 48px each on desktop, 40px mobile)
- Interactive hover states showing partial fills
- Display selected rating below stars (e.g., "4 out of 5 stars")

**Category Selection**:
- Segmented button group for categories: Service Quality, Response Time, Problem Resolution, Overall Experience
- Single-select, pill-style buttons with clear active state
- Full-width on mobile, inline on desktop

**Text Input**:
- Large textarea for comments (min-height: 120px)
- Character counter (max 500 characters)
- Placeholder: "Tell us about your experience..."

**Submit Section**:
- Primary action button (Submit Feedback) - full-width on mobile, auto-width on desktop
- Success state: Checkmark animation with confirmation message
- Form reset after 2 seconds

### Dashboard Components

**Key Metric Cards**:
Four prominent stat cards displaying:
1. Overall Average Rating (large number + star display)
2. Total Responses (count with trend indicator)
3. Response Rate This Month (percentage)
4. Top-Rated Category (badge display)

Card structure: Elevated surface with padding p-6, rounded corners, icon in accent color top-left

**Chart Visualizations**:
Use Chart.js or similar library via CDN

**Satisfaction Trend Chart**:
- Line graph showing average rating over time (last 30 days)
- Height: h-80
- Grid background, smooth curves, data point markers
- Tooltips on hover showing exact values

**Category Breakdown Chart**:
- Horizontal bar chart comparing average ratings across categories
- Color-coded bars (single accent hue with varying opacity)
- Values displayed at end of bars

**Distribution Chart**:
- Donut chart showing rating distribution (% of 1-star, 2-star, etc.)
- Legend positioned right on desktop, below on mobile

**Recent Feedback Stream**:
- Card-based list (not table) showing last 10-15 submissions
- Each card contains:
  - Star rating (visual display)
  - Category badge (small pill)
  - Comment excerpt (truncated to 2 lines with "Read more")
  - Timestamp (relative, e.g., "2 hours ago")
  - Expand/collapse for full comment
- Alternating subtle background for easy scanning

### Interactive Elements

**Buttons**:
- Primary: Solid background, rounded-lg, px-6 py-3, font-medium
- Secondary: Border outline, same padding
- Icon buttons: Square (40px), centered icon
- All buttons: Subtle shadow, smooth transitions

**Form Inputs**:
- Border-based design (not filled backgrounds)
- Focus state: Border color change + subtle shadow
- Label above input (text-sm font-medium)
- Helper text below (text-xs)

**Cards**:
- Border: 1px solid border-gray-200
- Shadow: shadow-sm with hover:shadow-md transition
- Border radius: rounded-lg
- Padding: p-6 for content cards, p-4 for compact cards

---

## Responsive Behavior

**Breakpoints**:
- Mobile-first approach
- Tablet: md: (768px) - 2-column grids begin
- Desktop: lg: (1024px) - Sidebar becomes fixed, full layouts activate

**Mobile Adaptations**:
- Sidebar converts to drawer navigation
- Stat cards stack vertically
- Charts maintain aspect ratio, reduce padding
- Form inputs full-width with larger touch targets (min-height: 48px)

---

## Images

**No hero image required** - This is a dashboard application, not a marketing page.

**Optional Supporting Graphics**:
- Empty state illustration for "No feedback yet" (centered, max-width 320px)
- Success confirmation icon/animation after form submission
- Small decorative icons for stat cards (customer service themed)

---

## Page Structure

### Feedback Submission View
1. Page header with title "Share Your Feedback"
2. Instructional text: "Help us improve by rating your experience"
3. Rating selector (stars, prominent)
4. Category selection (segmented buttons)
5. Comment textarea
6. Submit button

### Results Dashboard View
1. Dashboard header "Customer Satisfaction Insights"
2. Metric cards row (4 cards)
3. Two-column section:
   - Left: Satisfaction trend chart
   - Right: Category breakdown chart
4. Full-width distribution chart
5. Recent feedback section with scrollable list

### Responsive Single-Page Layout
For compact design, use tabbed interface switching between "Submit" and "Results" views, maintaining all components within each view.

---

**Design Complexity**: Professional data dashboard with emphasis on clarity, scanability, and actionable insights. Every element serves the dual purpose of data collection and transparent result display.