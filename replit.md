# Customer Satisfaction Feedback Platform

## Overview

This is a customer service satisfaction feedback application that allows users to submit feedback through a comprehensive rating system and view aggregated results through interactive dashboards. The platform features a multi-category rating system (Service Quality, Response Time, Problem Resolution, Overall Experience) with 1-5 star ratings, detailed comment collection, and real-time analytics visualization including trend charts, distribution graphs, and category breakdowns.

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
- Custom hooks for reusable logic (e.g., `use-mobile`, `use-toast`)

**Data Visualization**
- Recharts library for interactive charts (bar charts, line charts, pie charts)
- Custom chart components: CategoryChart, DistributionChart, TrendChart, MetricCard

**Key Design Decisions**
- Split-view layout with persistent sidebar navigation (280px fixed width)
- Responsive grid system: single column mobile, 2-4 columns desktop
- Dark/light theme support with CSS variable-based theming
- Form validation using Zod schemas with react-hook-form integration

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- RESTful API design with JSON request/response format
- Middleware for request logging, JSON parsing, and raw body capture

**API Routes**
- `POST /api/feedback` - Submit new customer feedback with validation
- `GET /api/feedback` - Retrieve all feedback entries sorted by creation date

**Data Storage Strategy**
- In-memory storage implementation (`MemStorage`) for development/prototyping
- Interface-based storage abstraction (`IStorage`) allowing easy swap to persistent databases
- Feedback entries include: id (UUID), rating (1-5), category (enum), comment (text), createdAt (timestamp)

**Validation & Type Safety**
- Shared schema definitions between client and server using Drizzle ORM and Zod
- Runtime validation on API endpoints to ensure data integrity
- Type inference from Zod schemas for TypeScript types

**Development Setup**
- Vite middleware integration for HMR in development
- Custom error overlay and development banner (Replit-specific plugins)
- Request/response logging with duration tracking

### External Dependencies

**Database**
- Neon serverless PostgreSQL configured via `@neondatabase/serverless`
- Drizzle ORM for type-safe database operations and migrations
- Connection via `DATABASE_URL` environment variable
- Schema defined with `pgTable` including feedback table with UUID primary keys

**UI Libraries**
- Radix UI primitives (@radix-ui/*) for accessible component foundations
- Lucide React for consistent iconography
- Recharts for data visualization
- embla-carousel-react for carousel functionality
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
- Frontend proxies API requests to Express backend
- Shared TypeScript paths (`@/`, `@shared/`) for module resolution
- Build outputs to `dist/public` for client and `dist/` for server