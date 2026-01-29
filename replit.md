# Thynx SaaS Platform

## Overview

Thynx is a comprehensive AI-powered technology platform that provides four core services: Idea Lab (AI consultation), Thynx Studio (technology officer matching), Thynx Repo (AI-powered repository platform), and Thynx Free Market (zero-commission marketplace). The application features a modern, dark-themed marketing website with premium aesthetics inspired by Prisma's design language, built as a single-page application with React and TypeScript.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter (lightweight alternative to React Router).

**UI Components**: Extensive use of shadcn/ui component library with Radix UI primitives, providing a comprehensive set of accessible, customizable components including dialogs, dropdowns, forms, navigation menus, and data display elements.

**Styling System**: Tailwind CSS with custom design tokens, featuring:
- Dark mode as default with light mode support
- CSS variables for theming (HSL color space)
- Custom color palette centered around fuchsia/purple brand colors
- Typography system using Inter for UI, Space Grotesk for headlines
- Consistent spacing primitives (4, 6, 8, 12, 16, 20, 24, 32)

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration.

**Design System**: Custom component library following Prisma-inspired aesthetics with bold typography, fluid animations, full-viewport hero sections, and alternating split layouts for service showcases.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Design**: RESTful API architecture with routes prefixed under `/api`. Currently minimal backend implementation with placeholder route registration system.

**Build System**: Custom esbuild configuration that bundles server code with selective dependency externalization to optimize cold start times.

**Development Mode**: Vite middleware integration for hot module replacement during development.

**Static File Serving**: Production builds serve pre-built client files from `dist/public` directory with fallback to index.html for client-side routing.

### Data Storage Solutions

**ORM**: Drizzle ORM configured for MySQL database operations.

**Database**: MySQL database with mysql2 driver. Connection configured in `server/db.ts`.

**Schema Management**: Type-safe schema definitions in `shared/schema.ts` using drizzle-orm/mysql-core with Zod validation integration for runtime type checking.

**Current Schema**: 
- Users table with UUID primary keys, username (unique with index), and password fields
- Blog posts table with UUID primary keys, category, title, excerpt, imageUrl, likes, comments, featured flag, and publishedAt timestamp

**Storage Abstraction**: Interface-based storage layer (`IStorage`) with MySQL implementation (`MySQLStorage`) using Drizzle ORM for all CRUD operations.

**Database Seeding**: Automatic seeding of blog posts on application startup if table is empty (`server/seed.ts`).

**Migration Strategy**: Drizzle Kit for schema migrations with migrations stored in `/migrations` directory.

### Authentication and Authorization

**Planned Implementation**: User authentication structure is scaffolded (user schema with username/password), but authentication middleware and session management are not yet implemented.

**Available Libraries**: Dependencies include `passport`, `passport-local`, `express-session`, `connect-pg-simple`, and `jsonwebtoken` for future authentication implementation.

### External Dependencies

**UI Component Library**: shadcn/ui built on Radix UI primitives for accessible component foundation.

**State Management**: @tanstack/react-query v5 for async state management and caching.

**Styling**: Tailwind CSS v3 with PostCSS for processing.

**Form Handling**: React Hook Form with @hookform/resolvers for validation integration.

**Database**: 
- MySQL database (external hosted)
- Drizzle ORM for type-safe database operations
- Drizzle Zod for schema validation

**Development Tools**:
- Replit-specific plugins for error overlay, cartographer, and dev banner
- TSX for TypeScript execution in development
- Vite for frontend bundling and HMR

**Asset Management**: Static assets stored in `attached_assets` directory including generated images and video backgrounds.

**Design Resources**: Google Fonts integration (Inter, Space Grotesk, DM Sans, Fira Code, Geist Mono, Architects Daughter).