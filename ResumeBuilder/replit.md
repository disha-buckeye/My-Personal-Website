# Disha Purkar - Personal Portfolio Website

## Overview

This is a modern, responsive personal portfolio website built for Disha Purkar, a high school student leader and entrepreneur. The application showcases her achievements, experiences, and provides a contact form for potential connections. It's built as a full-stack application with a React frontend and Express backend, featuring a clean, professional design with smooth animations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Animations**: Framer Motion for smooth transitions and interactions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Validation**: Zod schemas for request/response validation

### Build System
- **Frontend Bundler**: Vite with React plugin
- **Backend Bundler**: esbuild for production builds
- **Development**: tsx for TypeScript execution in development
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer

## Key Components

### Database Schema
- **Users Table**: Basic user management (id, username, password)
- **Contact Messages Table**: Stores contact form submissions (id, name, email, subject, message, created_at)
- **Study Sessions Table**: Tracks study timer sessions (id, timer_type, duration, theme, completed, created_at)

### API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Retrieve contact messages (admin)
- `POST /api/study-sessions` - Create study session record
- `GET /api/study-sessions` - Retrieve study sessions
- `PATCH /api/study-sessions/:id` - Update study session status

### UI Components
- Custom shadcn/ui component library with dark/light theme support
- Floating navigation bar with smooth scrolling
- Responsive design with mobile-first approach
- Form components with validation and error handling
- Toast notifications for user feedback

### Storage Layer
- **Production**: PostgreSQL with Drizzle ORM
- **Development**: In-memory storage fallback
- Database migrations managed through Drizzle Kit

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on frontend
   - Form data validated using Zod schema
   - API request sent to `/api/contact` endpoint
   - Backend validates and stores message in database
   - Success/error response returned to frontend
   - Toast notification displayed to user

2. **Page Navigation**:
   - Single-page application with smooth scrolling navigation
   - Floating nav bar tracks current section
   - Responsive design adapts to mobile/desktop

## External Dependencies

### Frontend Dependencies
- React ecosystem: React 18, React DOM, React Hook Form
- UI Components: Radix UI primitives, shadcn/ui components
- Styling: Tailwind CSS, class-variance-authority, clsx
- Animations: Framer Motion, Embla Carousel
- State Management: TanStack Query
- Validation: Zod, @hookform/resolvers
- Utilities: date-fns, lucide-react icons

### Backend Dependencies
- Express.js framework
- Database: Drizzle ORM, @neondatabase/serverless
- Session: express-session, connect-pg-simple
- Validation: Zod, drizzle-zod
- Development: tsx, typescript

### Development Dependencies
- Vite build system with React plugin
- TypeScript configuration
- Tailwind CSS configuration
- Drizzle Kit for database migrations
- Replit-specific plugins for development environment

## Deployment Strategy

### Production Build
- Frontend: Vite builds optimized React application to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js`
- Database: PostgreSQL connection via environment variable `DATABASE_URL`

### Development Environment
- Frontend: Vite dev server with HMR
- Backend: tsx with auto-restart on changes
- Database: Requires PostgreSQL connection string
- Replit integration: Custom plugins for development banner and cartographer

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)

### Database Setup
- Drizzle migrations in `./migrations` directory
- Schema defined in `./shared/schema.ts`
- Push schema changes: `npm run db:push`

## Recent Changes
- **January 1, 2025**: Added "Study with Me" page with comprehensive timer functionality
  - Implemented Pomodoro timer (25min work/5min break cycles) and custom timer options
  - Created four beautiful themed environments: Meadow, Forest, Rainy Day, City View
  - Integrated Spotify music player with volume control and playlist embedding
  - Added animated backgrounds with floating particles for ambiance
  - Built responsive navigation between portfolio and study pages
  - Enhanced color scheme to emphasize cerulean blue and coral throughout site

## Changelog
- June 30, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.