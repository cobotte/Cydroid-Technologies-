import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Script from "next/script";
import {
  SchemaMarkup,
  cydroidOrganizationSchema,
  cydroidLocalBusinessSchema,
  cydroidWebsiteSchema,
} from "@/components/ui";

import { RootLayout as SiteLayout } from "@/components/layout/RootLayout";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

/* ================================================================
   FONT SYSTEM
   Inter        → body, UI, labels, captions
   Plus Jakarta Sans → display, headings (h1–h6, hero text)
   Geist Mono   → code, pre, monospace elements
   ================================================================ */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // loaded on demand; not critical path
});

/* ================================================================
   ROOT METADATA
   ================================================================ */

export const metadata: Metadata = {
  title: {
    default: "CYDROID TECHNOLOGIES",
    template: "%s | CYDROID TECHNOLOGIES",
  },
  description:
    "Enterprise-grade software development, cloud engineering, AI solutions, mobile applications, DevOps, UI/UX, and cybersecurity solutions.",
  metadataBase: new URL("https://cydroidtech.com"),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "CYDROID TECHNOLOGIES | Engineering Tomorrow's Digital World",
    description:
      "Enterprise-grade software development, cloud engineering, AI solutions, mobile applications, DevOps, UI/UX, and cybersecurity solutions.",
    url: "https://cydroidtech.com",
    siteName: "CYDROID TECHNOLOGIES",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://cydroidtech.com/assets/og-default.png",
        width: 1200,
        height: 630,
        alt: "CYDROID TECHNOLOGIES — Engineering Tomorrow's Digital World",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CYDROID TECHNOLOGIES | Engineering Tomorrow's Digital World",
    description:
      "Enterprise-grade software development, cloud engineering, AI solutions, mobile applications, DevOps, UI/UX, and cybersecurity solutions.",
    creator: "@cydroidtech",
    images: ["https://cydroidtech.com/assets/og-default.png"],
  },
  robots: { index: true, follow: true },
  keywords: [
    "web development",
    "cybersecurity",
    "SEO marketing",
    "digital agency",
    "AI automation",
    "enterprise software",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1E88E5" },
    { media: "(prefers-color-scheme: dark)", color: "#1E88E5" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* ================================================================
   ROOT LAYOUT
   ================================================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}
      </head>
      <body className="min-h-full flex flex-col antialiased bg-background text-foreground" suppressHydrationWarning>
        <SchemaMarkup schema={cydroidOrganizationSchema} />
        <SchemaMarkup schema={cydroidLocalBusinessSchema} />
        <SchemaMarkup schema={cydroidWebsiteSchema} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <SiteLayout>
            {children}
            <ScrollToTop />
          </SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
