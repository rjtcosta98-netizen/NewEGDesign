"use client";

import { useEffect } from "react";

type Props = { code: string };

export default function InlineScripts({ code }: Props) {
  useEffect(() => {
    const run = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        new Function(code)();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[InlineScripts] error:", err);
      }
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(run);
      return () => w.cancelIdleCallback?.(id);
    }

    const id = window.setTimeout(run, 0);
    return () => window.clearTimeout(id);
  }, [code]);

  return null;
}
