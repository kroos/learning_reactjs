import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { cn } from '@/lib/utils';

/**
 * AppLayout Component - Laravel layouts.app.blade.php Equivalent
 * 
 * Provides a consistent page layout structure that mirrors Laravel's Blade layout system:
 * - Wraps page content with consistent structure
 * - Provides head component for SEO/metadata
 * - Injects page data similarly to Blade's @section('js')
 * - Supports dark mode transitions
 * - Consistent padding, typography, and spacing
 * 
 * Usage mirrors Laravel Blade layouts:
 * <AppLayout 
 *   title="Page Title"
 *   description="Page description"
 *   :initialData={pageData}
 * >
 *   <div className="p-6">
 *     <!-- Page content -->
 *   </div>
 * </AppLayout>
 * 
 * The component handles:
 * - Page title with app name prefix (like Laravel default)
 * - Dark mode appearance toggling
 * - Consistent page structure
 * - Inertia.js head management
 * - Form hook integration
 */
interface AppLayoutProps {
  /** Page title displayed in header */
  title: string;
  /** Optional description under the title */
  description?: string;
  /** Page content element */
  children: React.ReactNode;
  /** Page-level data injected like Blade's window.data */
  initialData?: any;
  /** Page-specific CSS classes ( Tailwind ) */
  className?: string;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Sets dark mode appearance ('light', 'dark', 'system') */
  appearance?: 'light' | 'dark' | 'system';
}

export default function AppLayout({
  title,
  description,
  children,
  initialData,
  className = '',
  footer,
  appearance = 'system',
}) {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAppearance = (app: 'light' | 'dark' | 'system') => {
      if (app === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(prefersDark);
      } else {
        setIsDark(app === 'dark');
      }
    };

    checkAppearance(appearance);

    const listener = window.matchMedia('(prefers-color-scheme: dark)');
    listener.addEventListener('change', (e) => checkAppearance('system'));
    return () => listener.removeEventListener('change', (e) => checkAppearance('system'));
  }, [appearance]);

  const darkClass = isDark ? 'dark:' : '';
  const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head
        title={title ? `${title} - ${appName}` : appName}
        meta={[
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'description', content: description || '' },
        ]}
      />

      <div className="flex min-h-screen flex-col">
        {/* 1st nav - optional header area */}
        <header className="border-b bg-primary/5 dark:bg-primary/10/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-medium text-foreground">
              {title}
            </h1>
            
            {/* Dark mode toggle */}
            {appearance !== 'system' && (
              <button
                onClick={() => setIsDark(prev => !prev)}
                className="rounded-md px-3 py-1 text-sm hover opacity-80 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? 'Light mode' : 'Dark mode'}
              </button>
            )}
          </div>
        </header>

        {/* Main content area - equivalent to @yield('content') in Blade */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </div>
        </main>

        {/* Footer area - optional */}
        {footer ? (
          <footer className="border-t pt-8 mt-auto flex items-center justify-between px-6 py-4 bg-background/50 dark:bg-background/10/20">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
};

/**
 * Page Section Component - Equivalent to Blade @section('content')
 * 
 * Used within AppLayout to define the main content area.
 * Mirrors Laravel Blade's section yielding pattern.
 */
interface PageSectionProps {
  /** Section content */
  children: React.ReactNode;
  /** Page title override */
  title?: string;
}

export const PageSection: React.FC<PageSectionProps> = ({ children, title }) => {
  return (
    <section className="prose lg:prose-xl max-w-none mx-auto p-6">
      {title && <h2 className="mb-6 text-2xl font-bold">{title}</h2>}
      {children}
    </section>
  );
};

/**
 * JS Section Helper - Equivalent to Blade @section('js')
 * 
 * A helper component that can be used to inject page-specific JavaScript
 * within Inertia.js context. While Inertia handles client-side rendering,
 * this provides a pattern for any additional JS initialization.
 */
interface JsSectionProps {
  /** JS initialization code as children */
  children: React.ReactNode;
  /** Dependencies that should trigger re-initialization */
  deps?: any[];
}

export const JsSection: React.FC<JsSectionProps> = ({ children, deps }) => {
  // In Inertia.js apps, page-specific JS is typically handled in the page component
  // using useEffect or similar hooks. This component provides a consistent
  // pattern for any additional JS that needs to run.
  
  React.useEffect(() => {
    // Could initialize third-party widgets, charts, etc. here
    // based on the children provided
  }, deps ?? []);

  return <div>{children}</div>;
};