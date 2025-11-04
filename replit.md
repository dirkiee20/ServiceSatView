# Customer Satisfaction Feedback Platform

## Overview

This is a multi-tenant customer service satisfaction feedback application that allows businesses to collect feedback from their customers through unique feedback links. Each registered user receives a unique feedback link and QR code to integrate into their system. The platform features user authentication, a comprehensive rating system (Service Quality, Response Time, Problem Resolution, Overall Experience) with 1-5 star ratings, detailed comment collection, and real-time analytics visualization including trend charts, distribution graphs, and category breakdowns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for client-side routing (lightweight alternative to React Router)

**UI Component System**
- shadcn/ui component library with Radix UI primitives providing accessible, customizable components
- Material Design principles adapted for dashboard-focused patterns
- Tailwind CSS for utility-first styling with custom design tokens defined in CSS variables
- Design system follows "new-york" style variant with neutral base colors

**State Management**
- TanStack Query (React Query) for server state management, caching, and API synchronization
- Local component state with React hooks for UI-specific state
- Custom hooks for reusable logic (e.g., `useAuth`, `use-mobile`, `use-toast`)

**Authentication**
- Replit Auth (OpenID Connect) for user authentication
- Supports Google, GitHub, X, Apple, and email/password login
- Session-based authentication with PostgreSQL session storage
- Protected routes with automatic redirect to login

**Data Visualization**
- Recharts library for interactive charts (bar charts, line charts, pie charts)
- Custom chart components: CategoryChart, DistributionChart, TrendChart, MetricCard
- QRCode library for generating feedback QR codes

**Key Design Decisions**
- Split-view layout with persistent sidebar navigation (280px fixed width) for authenticated users
- Responsive grid system: single column mobile, 2-4 columns desktop
- Dark/light theme support with CSS variable-based theming
- Form validation using Zod schemas with react-hook-form integration
- Landing page for unauthenticated users, dashboard for authenticated users

**Key Pages**
- **Landing Page**: Marketing page for unauthenticated users with login CTA
- **Home Page (Dashboard)**: Test feedback form for authenticated users
- **Results Page**: Analytics dashboard showing all feedback metrics
- **Integration Page**: Unique feedback link and QR code for each user
- **Public Feedback Page**: Public-facing form accessible via /f/{linkId}

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- RESTful API design with JSON request/response format
- Middleware for request logging, JSON parsing, and raw body capture
- Passport.js for OpenID Connect authentication with Replit

**Authentication & Session Management**
- Replit Auth (OpenID Connect) integration via `server/replitAuth.ts`
- PostgreSQL-backed session storage (connect-pg-simple)
- Session TTL: 7 days
- Automatic token refresh for expired sessions
- Protected routes using `isAuthenticated` middleware

**API Routes**
- **Auth Routes**:
  - `GET /api/login` - Begin login flow (redirects to Replit Auth)
  - `GET /api/callback` - OAuth callback handler
  - `GET /api/logout` - Logout and clear session
  - `GET /api/auth/user` - Get current authenticated user (protected)

- **Feedback Routes**:
  - `POST /api/feedback/submit/:linkId` - Submit feedback via public link (no auth required)
  - `GET /api/feedback` - Get user's feedback (protected, filtered by user ID)

**Data Storage Strategy**
- PostgreSQL database via Neon serverless
- Drizzle ORM for type-safe database operations and migrations
- Database-backed storage implementation (`DatabaseStorage`)
- Tables: users, sessions, feedback

**Database Schema**
- **users**: Stores user accounts with unique feedback link IDs
  - id (varchar, primary key)
  - email, firstName, lastName, profileImageUrl
  - feedbackLinkId (unique, auto-generated UUID)
  - createdAt, updatedAt

- **sessions**: Session storage for authentication
  - sid (varchar, primary key)
  - sess (jsonb)
  - expire (timestamp)

- **feedback**: Customer feedback entries
  - id (varchar, primary key)
  - userId (foreign key to users)
  - rating (integer, 1-5)
  - category (enum: service_quality, response_time, problem_resolution, overall_experience)
  - comment (text, max 500 chars)
  - createdAt (timestamp)

**Validation & Type Safety**
- Shared schema definitions between client and server using Drizzle ORM and Zod
- Runtime validation on API endpoints to ensure data integrity
- Type inference from Zod schemas for TypeScript types

**Development Setup**
- Vite middleware integration for HMR in development
- Custom error overlay and development banner (Replit-specific plugins)
- Request/response logging with duration tracking

### External Dependencies

**Database & ORM**
- Neon serverless PostgreSQL configured via `@neondatabase/serverless`
- Drizzle ORM for type-safe database operations and migrations
- Connection via `DATABASE_URL` environment variable
- Schema defined with `pgTable` including users, sessions, and feedback tables

**Authentication**
- openid-client for OAuth/OIDC authentication
- passport and passport strategies for Express integration
- connect-pg-simple for PostgreSQL session storage
- memoizee for caching OIDC configuration

**UI Libraries**
- Radix UI primitives (@radix-ui/*) for accessible component foundations
- Lucide React for consistent iconography
- Recharts for data visualization
- QRCode for generating feedback QR codes
- date-fns for date formatting and manipulation

**Form Handling**
- react-hook-form for performant form state management
- @hookform/resolvers for Zod schema integration
- Validation schemas shared between client and server via `shared/schema.ts`

**Styling & Theming**
- Tailwind CSS with PostCSS processing
- class-variance-authority for component variant management
- clsx and tailwind-merge utilities for conditional class composition

**Development Tools**
- Drizzle Kit for database migrations and schema management
- ESBuild for server-side bundling in production
- TSX for TypeScript execution in development
- Replit-specific development plugins (cartographer, dev-banner, runtime-error-modal)

**Key Integration Points**
- Database connection requires `DATABASE_URL` environment variable
- Session management requires `SESSION_SECRET` environment variable
- Authentication requires `REPL_ID` (auto-provided by Replit)
- Optional `ISSUER_URL` for custom OIDC providers (defaults to Replit)
- Frontend proxies API requests to Express backend
- Shared TypeScript paths (`@/`, `@shared/`) for module resolution

## Multi-Tenant Architecture

Each registered user is a tenant with their own:
- Unique feedback link ID (auto-generated UUID)
- Isolated feedback data (filtered by user ID)
- Personal dashboard showing only their feedback
- QR code for physical integration

**Feedback Collection Flow**:
1. Business registers and receives unique link: `/f/{feedbackLinkId}`
2. Business shares link with customers (email, website, QR code)
3. Customers submit feedback via public page (no login required)
4. Feedback is associated with the business's user account
5. Business views aggregated results in their dashboard

## Recent Changes

### November 4, 2025
- Added Replit Auth integration for user authentication
- Migrated from in-memory to PostgreSQL database storage
- Implemented multi-tenant architecture with unique feedback links per user
- Added Integration page with QR code generation
- Created landing page for unauthenticated users
- Updated all routes to support public feedback submission and protected dashboard access
- Added user profile display in sidebar with logout functionality
