"use client";

import * as React from "react";
import Script from "next/script";

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export function Turnstile({ onVerify, onExpire, onError }: TurnstileProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const widgetIdRef = React.useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  // If siteKey is missing, we'll render a fallback message or just skip rendering in dev
  const isEnabled = !!siteKey;

  React.useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    let isMounted = true;

    const renderWidget = () => {
      if (!window.turnstile || !containerRef.current || !isMounted) return;

      try {
        // Clear any old widget
        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }

        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => {
            if (isMounted) onVerify(token);
          },
          "expired-callback": () => {
            if (isMounted && onExpire) onExpire();
          },
          "error-callback": () => {
            if (isMounted && onError) onError();
          },
          theme: "dark",
        });
        widgetIdRef.current = id;
      } catch (err) {
        console.error("Error rendering Turnstile widget:", err);
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      window.onloadTurnstileCallback = renderWidget;
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
      }
    };
  }, [siteKey, isEnabled, onVerify, onExpire, onError]);

  if (!isEnabled) {
    if (process.env.NODE_ENV === "production") {
      return (
        <div className="p-3 text-[10px] font-mono text-amber-400 border border-amber-500/20 bg-amber-500/5 rounded-xl text-center">
          [SECURITY WARNING] CAPTCHA missing site key. Submissions may be blocked.
        </div>
      );
    }
    return (
      <div className="p-3 text-[10px] font-mono text-muted-foreground/60 border border-border/10 bg-card/10 rounded-xl text-center">
        [CAPTCHA DEV MODE] Turnstile site key not configured. Auto-passing in development.
      </div>
    );
  }

  return (
    <div className="flex justify-center my-3 select-none">
      <div ref={containerRef} />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        strategy="afterInteractive"
      />
    </div>
  );
}
