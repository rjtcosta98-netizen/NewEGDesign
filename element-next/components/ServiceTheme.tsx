'use client';
import { useEffect } from 'react';

export function ServiceTheme({ color }: { color: string }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-svc', color);
    return () => document.documentElement.removeAttribute('data-svc');
  }, [color]);
  return null;
}
