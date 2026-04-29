"use client";

import { useEffect, useRef } from "react";

type Props = { code: string };

/**
 * Injects the provided code as an inline <script> element appended to <body>.
 * Using script.textContent + appendChild respects the CSP 'unsafe-inline'
 * directive already present in next.config.mjs, whereas new Function() / eval()
 * would require the additional 'unsafe-eval' directive (which we intentionally omit).
 */
export default function InlineScripts({ code }: Props) {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;

    const script = document.createElement("script");
    script.textContent = code;
    document.body.appendChild(script);
  }, [code]);

  return null;
}
