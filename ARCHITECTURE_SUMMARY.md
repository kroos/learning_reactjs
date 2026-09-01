# G:\reactjs - React/Inertia.js Laravel Project Architecture Summary

## Project Overview
This is a Laravel 13 project with a React/Inertia.js v3 frontend, named `laravel/blank-react-starter-kit`. It uses TypeScript, Vite, Tailwind CSS v4, and Wayfinder for a modern full-stack development experience.

## Core Architecture

### Backend (Laravel 13)
- **PHP 8.3+** with Laravel 13.x
- **Inertia.js v3** (`inertiajs/inertia-laravel`) for server-side routing and rendering
- **Laravel Sanctum** (`^4.0`) for API authentication
- **Laravel Wayfinder** (`^0.1.14`) for automatic TypeScript route generation
- **Same base architecture** as G:\laravel13:
  - `App\Models\Model` base class with `HasFactory` and `Auditable` traits
  - Two-tier authentication: `Login` model + `User` model
  - `EloquentUserProvider` custom auth provider
  - Same ModelAjaxSupportController and ModelAjaxCRUDController pattern
  - Same extensions structure (Auth, Helper)
  - Same traits structure (Auditable)

### Frontend (React/Inertia.js v3 + TypeScript)

#### Build System
- **Vite ^8.0.0** with:
  - `@inertiajs/vite` - Inertia.js Vite plugin (enables SSR without Node.js server)
  - `@vitejs/plugin-react` - React plugin with React Compiler
  - `@rolldown/plugin-babel` - Babel for JSX compilation
  - `@tailwindcss/vite` - Tailwind CSS v4 integration
  - `laravel-vite-plugin` - Laravel asset management
  - `@laravel/vite-plugin-wayfinder` - Route generation
  - `vite-plus` - Extended Vite functionality

#### Framework & Libraries
- **React 19.2.0** with **react-dom 19.2.0**
- **@inertiajs/react ^3.0.0** - Inertia.js React integration
- **Tailwind CSS ^4.0.0** - Utility-first CSS (v4, integrated via Vite)
- **clsx + tailwind-merge** - Class name utility (`cn()` function)
- **TypeScript ^5.7.2** with strict mode enabled
- **@types/react ^19.2.0** + **@types/react-dom ^19.2.0**

#### Routing System (Wayfinder)
- **Fully TypeScript-based** route generation
- Routes are defined in `resources/js/routes/`
- Auto-generated from Laravel route definitions
- Each route function returns typed `RouteDefinition` or `RouteFormDefinition`
- Supports query params, form variants, and nested route groups
- Path aliases: `@/*` maps to `./resources/js/*`

## File Structure

### Root Directory
```
G:\reactjs\
├── .agents/skills/           # Agent skill definitions
├── .github/                  # GitHub CI/CD workflows
├── app/                      # PHP application code
├── bootstrap/                # Bootstrap files
├── config/                   # Laravel configuration files
├── database/                 # Migrations, factories, seeders
├── node_modules/             # Node.js dependencies
├── public/                   # Public assets
├── resources/                # Frontend and views
├── routes/                   # Laravel route definitions
├── storage/                  # Storage (logs, cache, etc.)
├── tests/                    # Test files
├── vendor/                   # PHP dependencies
├── AGENTS.md                 # Agent guidelines (same as G:\laravel13)
├── artisan                   # Laravel artisan CLI
├── boost.json                # Laravel Boost configuration
├── composer.json             # PHP dependencies
├── opencode.json             # OpenCode configuration
├── package.json              # Node.js dependencies
├── phpstan.neon              # PHPStan configuration
├── phpunit.xml               # PHPUnit configuration
├── pint.json                 # Laravel Pint configuration
├── pnpm-workspace.yaml       # pnpm workspace configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

### Frontend Structure (resources/js/)
```
resources/js/
├── actions/                  # Inertia.js actions
│   └── Inertia/
│       ├── Controller.ts     # Controller route helper
│       ├── index.ts          # Export file
│       └── DevTools/         # DevTools support
│           ├── index.ts
│           └── Http/
│               └── EntriesController.ts
├── lib/                      # Utility libraries
│   └── utils.ts              # cn() helper function
├── pages/                    # React page components
│   └── welcome.tsx           # Welcome page component
├── routes/                   # Auto-generated TypeScript routes
│   ├── index.ts              # Home route
│   └── storage/
│       ├── index.ts          # Storage route group
│       └── local/
│           └── index.ts      # Local storage routes
├── types/                    # TypeScript type definitions
│   ├── auth.ts               # User and Auth types
│   ├── global.d.ts           # Global type declarations
│   └── vite-env.d.ts         # Vite environment types
└── wayfinder/                # Wayfinder runtime
    └── index.ts              # Query params and route utilities
```

### Frontend Structure (resources/views/)
- `app.blade.php` - Minimal Inertia.js app wrapper (22 lines)
  - Uses `@fonts` for font loading
  - Uses `@viteReactRefresh` for HMR
  - Uses `@vite()` to bundle CSS, JS, and page components
  - Uses `<x-inertia::head>` and `<x-inertia::app>` components

### Backend Structure (app/)
```
app/
├── Extensions/               # Custom extensions
│   ├── Auth/
│   │   └── EloquentUserProvider.php  # Custom auth provider
│   └── Helper/
│       └── HelperServiceProvider.php # Helper service provider
├── Helpers/                  # Helper classes
│   └── ExampleHelper.php
├── Http/                     # HTTP layer
│   ├── Controllers/
│   │   ├── API/
│   │   │   ├── ModelAjaxCRUDController.php
│   │   │   └── ModelAjaxSupportController.php
│   │   ├── Auth/             # Standard Laravel auth controllers
│   │   ├── System/           # System controllers (ActivityLog, BatchProgress)
│   │   └── ProfileController.php
│   ├── Middleware/           # Custom middleware
│   └── Requests/             # Form requests
├── Models/                   # Eloquent models
│   ├── System/               # System models (ActivityLog, JobBatch)
│   ├── Login.php             # Two-tier auth - login model
│   ├── Model.php             # Base model class
│   ├── User.php              # Two-tier auth - user model
│   └── YesNoOption.php
├── Providers/                # Service providers
└── Traits/                   # Reusable traits
```

## Key Configuration Files

### vite.config.ts
```typescript
// Uses lazyPlugins for better build performance
// Key plugins: laravel(), inertia(), react(), babel(), tailwindcss(), wayfinder()
// Wayfinder config: { formVariants: true }
// Fonts: Instrument Sans (weights 400, 500, 600) via bunny
// Lint config with type-aware checking
// Format config: 80 printWidth, 4 tabWidth, single quotes
```

### tsconfig.json
- **target**: ESNext
- **module**: ESNext
- **moduleResolution**: bundler
- **strict**: true (all strict type-checking)
- **jsx**: react-jsx
- **paths**: @/* → ./resources/js/*
- **include**: resources/js/**/*.ts, .d.ts, .tsx

## Design Patterns

### Inertia.js Page Components
- Pages live in `resources/js/pages/`
- Each page is a React function component
- Uses `<Head>` component for SEO meta tags
- Example structure in `welcome.tsx`:
  - Full-width responsive layout
  - Dark mode support with `dark:` prefix
  - Animated transitions with CSS classes
  - Interactive SVG graphics
  - Tailwind CSS v4 utility classes

### TypeScript Route System
- Routes are generated automatically by Wayfinder
- Each route has `.url`, `.get()`, `.post()`, etc. methods
- Form variants with `.form` property
- Type-safe query parameters
- Example: `home.get()`, `home.url()`, `home.form.get()`

### Type Definitions
- **Auth type**: `{ user: User }`
- **User type**: `{ id, name, email, avatar?, email_verified_at, created_at, updated_at }`
- Inertia page props defined in `global.d.ts`

## Development Workflow

### Package Scripts
```bash
# Development
npm run dev            # Vite dev server

# Build
npm run build          # Production build
npm run build:ssr      # Build with SSR

# Type Checking
npm run check          # Vite type check
npm run types:check    # TypeScript strict check
npm run check:fix      # Auto-fix type issues

# Inertia DevTools
npm run dev             # Includes Inertia DevTools
```

### Running PHP
```bash
# Development
composer run dev        # Start all dev servers

# Testing
php artisan test        # Run Pest tests
php artisan test --compact  # Compact output

# Code Quality
composer run lint       # Run Pint formatter
composer run types:check  # Run PHPStan
```

## Key Differences from G:\laravel13

### G:\laravel13 (jQuery + Blade)
- jQuery-based frontend
- Blade templates for views
- DataTables with server-side processing
- Bootstrap 5.3 primary design system
- Tailwind CSS v3 scoped supplement
- Vanilla JavaScript in modules/
- CommonJS-style imports (via require)
- Multiple navbar/sidebar layout structure
- More traditional Laravel approach

### G:\reactjs (React + Inertia.js)
- React 19 frontend with TypeScript
- Inertia.js v3 for SPA-like experience
- Tailwind CSS v4 integrated via Vite
- Wayfinder for TypeScript route generation
- React components instead of Blade views
- Modern CSS transitions and animations
- Minimal Blade (just app wrapper)
- Inertia.js specific patterns and hooks

## Strengths of This Architecture

1. **Type Safety**: Full TypeScript coverage with strict mode
2. **Developer Experience**: Hot module replacement, auto route generation
3. **Performance**: Vite's fast build, Tailwind CSS v4's optimized output
4. **Modern Patterns**: React hooks, Inertia.js data fetching, optimistic updates
5. **Seamless SSR**: Automatic server-side rendering in dev mode
6. **Clean Separation**: Backend stays Laravel, frontend stays React/TypeScript
7. **Type-Safe Routes**: Wayfinder generates TypeScript from PHP routes
8. **Consistent Backend**: Same Laravel patterns and conventions

## Summary

This project represents a modern Laravel + React development stack using Inertia.js v3, Vite, TypeScript, and Tailwind CSS v4. It maintains all the established Laravel backend patterns (two-tier auth, base models, auditing, API controllers) while providing a modern React/TypeScript frontend experience with automatic route type generation and seamless SSR capabilities.

The project is configured for production-ready development with:
- Strict TypeScript checking
- Code formatting (Pint for PHP, Prettier-like config for JS/TS)
- Linting and type checking
- Test coverage with Pest
- Dark mode support
- Responsive design
- Modern CSS animations and transitions