/**
 * CYDROID TECHNOLOGIES — Root Layout Wrapper Component
 *
 * Composes Header + main content area + Footer into a
 * consistent full-page layout. Import and use this in page-level
 * route layouts that need the shell navigation.
 *
 * Usage in a route's layout.tsx:
 *   import { RootLayout } from "@/components/layout/RootLayout";
 *   export default function ServiceLayout({ children }) {
 *     return <RootLayout>{children}</RootLayout>;
 *   }
 *
 * @phase 1 — Structural placeholder only.
 */

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
