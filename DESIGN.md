# Trading Learning Path — Design System

Version: 1.0
Design Direction: The Market Atlas
Product: Trading Learning Path

---

## 1. Design Philosophy

Trading Learning Path is an editorial-first financial education platform.

It should feel like a combination of:

- A premium financial publication.
- An interactive educational platform.
- A professional market research tool.
- A carefully art-directed digital experience.

The interface must communicate intelligence, clarity, trust, and curiosity.

The design must NOT look like a generic SaaS dashboard or an AI-generated website template.

### Core principles

1. Editorial over generic SaaS.
2. Clarity over decoration.
3. Typography over excessive cards.
4. Information hierarchy over visual noise.
5. Real interactions over decorative animations.
6. Custom visualizations over generic illustrations.
7. Consistency over random component styling.

The product should feel intentionally designed, not assembled from a component library.

---

## 2. Brand Identity

Brand name: Trading Learning Path

Brand positioning:
A structured and interactive journey to understanding financial markets and trading.

Brand personality:
- Intelligent
- Precise
- Curious
- Analytical
- Approachable
- Professional

Suggested brand tagline:

"Understand the Market. Master the Process."

Alternative:
"Your Path to Understanding the Markets."

---

## 3. Visual Direction

### Overall aesthetic

Editorial Swiss design with contemporary financial visualization.

Visual references:
- Swiss International Typographic Style.
- Premium financial magazines.
- Minimalist editorial websites.
- Contemporary data journalism.
- Awwwards-quality interactive experiences.

Use:
- Asymmetric layouts.
- Large editorial typography.
- Strong grid systems.
- Generous whitespace.
- Carefully controlled accent colors.
- Custom market-inspired graphics.
- Fine dividers and subtle borders.

Avoid:
- Generic SaaS dashboard layouts.
- Excessive rounded cards.
- Purple gradient backgrounds.
- Random decorative blobs.
- Glassmorphism everywhere.
- Excessive shadows.
- Unnecessary glowing effects.
- Repeated three-column feature cards.
- Generic stock illustrations.
- Fake terminal aesthetics.
- Excessive floating elements.
- Unnecessary badge collections.

---

## 4. Color System

Use CSS variables and centralized design tokens.

### Primary colors

--color-paper: #F5F3ED;
--color-ink: #171916;
--color-signal: #F26A3D;
--color-market: #6D896B;
--color-border: #DCD9D0;
--color-surface: #EAE7DF;

### Semantic colors

--color-success: #527D5B;
--color-warning: #D69A3A;
--color-danger: #C64D43;
--color-muted: #85857D;

### Usage rules

Paper:
Main page background.

Ink:
Primary typography, navigation, and important interface elements.

Signal:
Primary CTA, active states, and important highlights.

Market:
Positive market examples and successful learning states.

Border:
Dividers, separators, and subtle component outlines.

Never use all accent colors simultaneously without a clear semantic purpose.

---

## 5. Typography

Typography is a core visual element.

Use a deliberate pairing:

Display serif:
Instrument Serif or a comparable editorial serif.

Interface sans-serif:
Inter, Geist, or a comparable modern sans-serif.

Suggested hierarchy:

Display:
Large editorial headlines with tight line height.

Heading:
Clear section hierarchy.

Body:
Comfortable reading size and generous line height.

Metadata:
Small uppercase labels with restrained letter spacing.

Use serif typography selectively for headlines and important editorial moments.

Do not use oversized typography in every section.

Do not use excessive font weights.

---

## 6. Layout System

Use a consistent responsive grid.

Desktop:
- Maximum content width around 1440px.
- Generous horizontal margins.
- 12-column conceptual grid.
- Asymmetric content distribution.
- Consistent section spacing.

Tablet:
- Adapt the grid to 8 columns.
- Reduce horizontal spacing.

Mobile:
- Single-column content flow.
- Maintain typography hierarchy.
- Avoid horizontal overflow.
- Preserve whitespace and readability.

Use consistent spacing tokens.

Do not make every section use the same layout.

Each section should have a layout appropriate to its content.

---

## 7. Component Design

### Navigation

Minimal editorial navigation.

Include:
- Brand identity.
- Learning paths.
- Explore.
- About.
- Login / Get Started.

Avoid oversized navigation bars.

### Buttons

Primary:
Signal orange background with dark text or an appropriately accessible contrasting treatment.

Secondary:
Transparent background with subtle border.

Buttons should have clear hover and focus states.

Avoid unnecessary pill-shaped buttons.

### Cards

Cards should be used only when content benefits from containment.

Prefer:
- Editorial sections.
- Open layouts.
- Dividers.
- Structured content groups.

Use rounded corners sparingly.

### Interactive elements

Every interactive element must have a real purpose.

Include:
- Hover feedback.
- Focus states.
- Loading states.
- Empty states.
- Error states where relevant.

---

## 8. Landing Page Art Direction

The landing page is the primary expression of the brand.

It must feel like an editorial experience, not a generic product landing page.

### Section 01 — Hero

Purpose:
Communicate the platform's value immediately.

Content:
- Small editorial eyebrow.
- Strong headline.
- Concise description.
- Primary CTA.
- Secondary CTA.
- Custom market visualization.

Suggested headline:

"Understand the Market.
One Concept at a Time."

Supporting text:

"An interactive learning path designed to take you from trading fundamentals to confident market analysis."

Visual:
Create a custom market-inspired visualization.

Do not use a generic stock trading dashboard screenshot.

### Section 02 — Market Perspective

Purpose:
Explain that trading is a structured discipline.

Show:
- Market structure.
- Price behavior.
- Risk and probability.
- Analytical thinking.

Use custom diagrams and visual explanations.

### Section 03 — Learning Roadmap

Purpose:
Show the core product experience.

Create a visually distinctive roadmap preview.

Show progression:
01. Foundations
02. Market Mechanics
03. Technical Analysis
04. Risk Management
05. Trading Strategies
06. Advanced Practice

The roadmap should feel connected, structured, and interactive.

### Section 04 — Learn Through Practice

Purpose:
Show that users do more than read lessons.

Include:
- Candlestick exercises.
- Chart interpretation.
- Risk/reward examples.
- Interactive learning previews.

Use real working demonstrations wherever possible.

### Section 05 — Learning Philosophy

Purpose:
Explain the educational methodology.

Use editorial typography and structured content.

Avoid generic benefit cards.

### Section 06 — Final CTA

Purpose:
Encourage users to begin learning.

Use a strong visual and concise message.

---

## 9. Motion & Interaction

Motion should be intentional.

Preferred principles:
- Subtle entrance transitions.
- Short and responsive hover interactions.
- Smooth section transitions.
- Interactive chart feedback.
- Scroll storytelling only where meaningful.

Respect prefers-reduced-motion.

Avoid:
- Excessive parallax.
- Constant floating animations.
- Endless pulsing effects.
- Animations that delay content access.
- Animations that distract from reading.

Preferred tools:
- Motion for React.
- GSAP when complex sequencing is necessary.

---

## 10. Data Visualization

Financial graphics should be treated as educational content.

Preferred:
- Candlestick charts.
- Market structure diagrams.
- Support/resistance illustrations.
- Trend visualization.
- Risk/reward diagrams.

Use real charting libraries where interaction is required.

Clearly label illustrative or simulated market data.

Never present fabricated data as live market data.

---

## 11. Accessibility

Requirements:
- Semantic HTML.
- Sufficient color contrast.
- Keyboard navigation.
- Visible focus states.
- Accessible controls.
- Reduced-motion support.
- Responsive text sizing.

Do not sacrifice usability for visual effects.

---

## 12. Responsive Behavior

Desktop:
Editorial compositions with custom visualizations.

Tablet:
Preserve visual hierarchy while simplifying layouts.

Mobile:
Prioritize reading, navigation, and touch interaction.

Every section must be intentionally adapted to mobile.

---

## 13. Implementation Rules

1. Read this document before implementing any new UI.
2. Reuse existing design tokens.
3. Never introduce random colors.
4. Never introduce arbitrary border radii.
5. Never create new typography styles without considering the hierarchy.
6. Avoid duplicating components.
7. Preserve existing application functionality.
8. Keep the implementation maintainable.
9. Test responsive layouts.
10. Ensure all visible interactions work.

When a design decision conflicts with this document, follow this document unless there is a strong usability or accessibility reason to deviate.

---

## 14. Quality Gate

Before considering a page complete, ask:

- Does it look intentionally art-directed?
- Does it avoid generic AI-generated aesthetics?
- Is the visual hierarchy obvious?
- Does typography create a recognizable identity?
- Is whitespace used effectively?
- Does each component have a purpose?
- Are interactions functional?
- Does the mobile layout feel intentional?
- Does the page feel like one cohesive product?

If the answer to any important question is no, revise before declaring completion.

Design quality must be evaluated as a complete composition, not just a collection of individual components.

## 15. Public-First Product Architecture

Trading Learning Path is a PUBLIC-FIRST educational platform.

The platform must never require authentication to access educational content.

### Public Learners

Visitors can immediately:

- Explore all learning roadmaps.
- Read educational lessons.
- Access trading playgrounds.
- Use educational calculators.
- Complete interactive exercises.
- Browse educational resources.
- Access public learning materials.

No registration wall.
No mandatory login.
No authentication popup interrupting learning.

Learning progress may be stored locally using browser storage, where appropriate.

Clearly communicate that locally stored progress may not synchronize across devices.

### Registered Contributors

Authentication is exclusively intended for contributors and authorized content management users.

Contributor capabilities may include:

- Contributor registration.
- Contributor login.
- Contributor profile.
- Submit educational materials.
- Edit their own submissions.
- View submission review status.
- Manage their contributions.

Any publishing or editing permissions must follow the application's actual authorization rules.

### Navigation Rules

Public navigation should prioritize:

- Home
- Learning Paths
- Explore
- Trading Playground
- About

Contributor actions should be presented separately:

- Become a Contributor
- Contributor Login

Do not display a prominent Login button as the primary CTA.

The primary CTA must always encourage users to start learning.

### Authentication UX

Authentication pages should be visually consistent with the main design system.

However, they should remain separate from the public learning experience.

Registration should clearly communicate that it is for contributors, not ordinary learners.

### Product Philosophy

The platform should communicate:

"Knowledge should be accessible. Contribution should be collaborative."

The learning experience must be accessible without creating an account.
