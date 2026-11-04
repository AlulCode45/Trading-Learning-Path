# TRADING LEARNING PATH
## Product & Design System

Version: 2.0
Product Direction: Financial Knowledge Atlas
Core Inspiration: roadmap.sh

---

# 1. PRODUCT DEFINITION

Trading Learning Path is an open, community-driven knowledge platform focused on trading and financial markets.

It provides structured visual learning roadmaps and comprehensive reading materials.

The product is NOT:

- An online trading course.
- A trading signals platform.
- A brokerage service.
- A financial advisory company.
- A conventional SaaS dashboard.
- A subscription-based learning management system.

The product IS:

- A visual learning roadmap platform.
- An open trading knowledge base.
- A collection of interconnected educational documentation.
- A directory of useful financial learning resources.
- A collaborative knowledge platform.

Core philosophy:

"Explore the roadmap. Understand the concepts. Build your knowledge."

The platform should closely follow the information architecture and learning experience philosophy of roadmap.sh, adapted specifically for trading and financial markets.

Do not directly copy its visual design.

---

# 2. CORE PRODUCT PRINCIPLES

## Roadmap First

The roadmap is the heart of the entire application.

Users should be able to visually understand what they need to learn, what comes first, and how concepts relate to one another.

Every major learning category must have a real visual roadmap.

A roadmap is not a list of cards.

It is a structured graph containing:
- Learning nodes.
- Connections.
- Dependencies.
- Learning stages.
- Topic relationships.
- Optional branches.

## Documentation First

Every meaningful roadmap node should connect to actual educational content.

Do not create empty topic pages.

The knowledge base must be a first-class part of the application.

## Public Knowledge

All educational roadmaps, articles, documentation, and public resources must be accessible without authentication.

## Community Driven

Registered contributors can submit and maintain educational materials according to their permissions.

---

# 3. INFORMATION ARCHITECTURE

Primary navigation:

- Home
- Roadmaps
- Knowledge Base
- Resources
- About

Secondary action:

- Become a Contributor

Contributor authentication:
- Register
- Login

Never require authentication to read public content.

## Main application routes

Suggested routes:

/
  Homepage

/roadmaps
  Roadmap directory

/roadmaps/:slug
  Interactive roadmap detail

/learn/:slug
  Educational documentation

/topics
  Knowledge base directory

/topics/:slug
  Topic detail

/resources
  External learning resources

/resources/:slug
  Resource detail

/contribute
  Contributor information

/contribute/register
  Contributor registration

/contribute/login
  Contributor login

/contributor
  Contributor workspace

Adapt these routes to existing project conventions.

Do not create duplicate routing systems.

---

# 4. ROADMAP SYSTEM

This is the most important product feature.

Each roadmap must be a real visual graph.

A roadmap consists of:

- Title.
- Description.
- Difficulty.
- Estimated learning scope.
- Categories.
- Learning nodes.
- Edges and dependencies.
- Related roadmaps.

## Node states

- Not started.
- Available.
- In progress.
- Completed.
- Optional.
- Locked, only when a genuine prerequisite exists.

Do not artificially lock educational content.

## Node interaction

When a user selects a node, show:

- Topic title.
- Short explanation.
- Learning objectives.
- Prerequisites.
- Related topics.
- Estimated reading time when known.
- Documentation link.
- External references.

A node must link to actual content.

## Roadmap interactions

Support:
- Zoom in/out.
- Pan and drag.
- Fit to screen.
- Node selection.
- Search.
- Category filtering.
- Progress visualization.
- Navigation to documentation.

Use React Flow or an appropriate SVG-based graph renderer.

Choose the implementation that produces the best balance between visual quality, performance, and usability.

The roadmap must remain usable on mobile.

---

# 5. INITIAL ROADMAP CATALOG

Create a coherent roadmap catalog.

Recommended initial roadmaps:

1. Trading Fundamentals
2. Financial Markets
3. Technical Analysis
4. Fundamental Analysis
5. Risk Management
6. Trading Psychology
7. Price Action
8. Forex Trading
9. Stock Market
10. Cryptocurrency Trading
11. Derivatives and Futures
12. Algorithmic Trading

Each roadmap should have a meaningful scope and structured learning dependencies.

Avoid duplicating topics unnecessarily.

Related topics can be shared between roadmaps.

---

# 6. DOCUMENTATION & KNOWLEDGE BASE

Documentation is equally important as roadmaps.

Every core topic must have a readable article or documentation page.

## Documentation structure

- Breadcrumb navigation.
- Article title.
- Short introduction.
- Table of contents.
- Main educational content.
- Relevant diagrams.
- Financial examples.
- Key takeaways.
- Common mistakes.
- Related topics.
- External references.
- Previous and next navigation.

## Content requirements

Content must be genuinely educational.

Do not use:
- Lorem ipsum.
- Repetitive generic explanations.
- One-paragraph placeholder articles.
- Unsupported financial claims.
- Fabricated references.

Each article should explain its topic with sufficient depth.

Use diagrams and visual examples when they genuinely improve understanding.

Clearly distinguish educational examples from live market data.

---

# 7. HOMEPAGE

The homepage should behave as a knowledge discovery interface.

It is NOT a marketing landing page for a financial education company.

Primary purpose:
Help visitors discover learning roadmaps and explore financial knowledge.

Recommended sections:

## Hero

A concise introduction.

Suggested headline:

"Your Map to Understanding the Markets."

Supporting description:

"Explore structured trading roadmaps, understand financial concepts, and learn how markets work — one topic at a time."

Primary CTA:
Explore Roadmaps.

Secondary CTA:
Browse Knowledge Base.

Include a visible preview of an actual learning roadmap.

The roadmap should be a major visual component of the hero or the first content section.

## Roadmap Directory

Display available learning paths.

Show meaningful metadata:
- Difficulty.
- Topic count.
- Category.
- Description.

## Knowledge Discovery

Allow users to explore important educational articles.

## Financial Concepts

Introduce key areas:
- Market Structure.
- Technical Analysis.
- Fundamental Analysis.
- Risk Management.
- Trading Psychology.

## Resources

Display curated educational resources.

## Community Contribution

Explain how people can contribute knowledge.

Do not present the platform as an instructor-led business.

---

# 8. VISUAL DESIGN DIRECTION

Direction:

Financial Knowledge Atlas.

The visual language should combine:

- Financial market aesthetics.
- Technical documentation.
- Interactive knowledge graphs.
- Modern developer learning platforms.
- Data visualization.

Use a sophisticated visual identity.

Suggested colors:

--background: #0B1018;
--surface: #121B27;
--surface-elevated: #182434;
--foreground: #E8EDF3;
--muted: #98A5B5;
--border: #293647;

--market-green: #31C48D;
--market-red: #F06464;
--signal-blue: #5B9CFF;
--signal-amber: #E7B65B;

Colors should communicate meaning.

Green:
Positive market examples and completed states.

Red:
Negative market examples and risk warnings.

Blue:
Information and active navigation.

Amber:
Warnings and important concepts.

Do not turn the entire website into a trading terminal.

Use market-inspired visual elements selectively.

## Typography

Use modern, readable sans-serif typography.

Suggested:
- Geist.
- Inter.
- IBM Plex Sans.

Use monospaced typography selectively for:
- Financial symbols.
- Chart labels.
- Technical values.
- Metadata.

Maintain excellent reading comfort.

## Layout

Prefer:
- Strong content hierarchy.
- Structured navigation.
- Technical grid systems.
- Clear spacing.
- Visual relationships.
- Purposeful whitespace.
- Information-dense but readable layouts.

Avoid:
- Generic AI SaaS templates.
- Excessive card layouts.
- Unnecessary glassmorphism.
- Excessive gradients.
- Random illustrations.
- Repetitive feature grids.
- Decorative animations.
- Oversized marketing sections.

---

# 9. DOCUMENTATION DESIGN

The article reading experience must be inspired by high-quality technical documentation.

Desktop:
- Left navigation or roadmap context.
- Main reading column.
- Right table of contents.

Mobile:
- Single reading column.
- Collapsible table of contents.
- Easy previous/next navigation.

The article must prioritize readability.

Support:
- Headings.
- Lists.
- Tables.
- Code or formula blocks when relevant.
- Images.
- SVG diagrams.
- Callouts.
- References.
- Related articles.

---

# 10. PROGRESS TRACKING

Learning progress is optional and must not require authentication.

Anonymous progress may be stored locally.

Do not block learning when browser storage is unavailable.

Progress indicators must be optional and must never restrict public content.

Clearly communicate local-only persistence.

---

# 11. CONTRIBUTOR SYSTEM

Authentication exists exclusively for contributors and authorized content managers.

Public users:
- Browse all roadmaps.
- Read all articles.
- Explore resources.
- Use public learning tools.

Registered contributors:
- Submit educational articles.
- Propose roadmap nodes.
- Edit authorized contributions.
- View moderation status.
- Manage their submissions.

Publishing permissions must respect the actual backend authorization model.

---

# 12. CONTENT QUALITY

Accuracy is essential.

Financial education must:
- Explain uncertainty.
- Avoid profit guarantees.
- Explain risks.
- Avoid presenting trading as an easy way to make money.
- Distinguish educational simulations from actual market information.
- Provide credible references.

Risk management must be represented throughout the learning system.

---

# 13. ACCESSIBILITY & PERFORMANCE

Requirements:
- Keyboard-accessible roadmap.
- Semantic HTML.
- Accessible graph alternatives.
- Responsive documentation.
- Reduced motion.
- Efficient rendering.
- Optimized graph interactions.
- No horizontal overflow.

Provide a readable alternative to the visual roadmap for screen readers and users who prefer linear navigation.

---

# 14. DESIGN QUALITY RULES

Read the antislop skill and frontend-taste skill before creating interfaces.

Never blindly generate generic UI.

Every component must serve a product purpose.

Every roadmap node must connect to meaningful knowledge.

Every article must contain meaningful educational content.

Every navigation element must lead somewhere real.

The final application must feel like a complete open knowledge ecosystem.

---

# 15. DEFINITION OF DONE

The product is not complete when it merely looks attractive.

It is complete when:

1. Users can discover real roadmaps.
2. Users can explore visual roadmap diagrams.
3. Users can click roadmap nodes.
4. Nodes link to actual educational documentation.
5. Articles are readable and sufficiently detailed.
6. Related topics are interconnected.
7. Public content works without authentication.
8. Contributor authentication works independently.
9. Roadmaps work on desktop and mobile.
10. The knowledge architecture is consistent and extensible.
