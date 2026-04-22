# Element Group — Next.js Build

Versão Next.js 14 (App Router + TypeScript) do site `element-group`.

## Stack
- Next.js 14.2 / React 18.3 / TypeScript 5.5
- Plus Jakarta Sans + Instrument Serif (Google Fonts)
- CSS global em `app/globals.css` (extraído do HTML original, ~1.3k linhas)

## Arquitectura

| Ficheiro | Papel |
|---|---|
| `app/layout.tsx` | Root layout PT-PT, fontes Google, metadata. |
| `app/page.tsx` | Server component. Lê `_body.html` + `_scripts.js` em build/request e passa para o client. |
| `app/_body.html` | Markup completo da landing (hero → footer). |
| `app/_scripts.js` | Controllers vanilla-JS (carrosséis, reveal observers, FAQ, etc.). |
| `app/globals.css` | Estilos globais (variáveis, atmos-pro, secções, etc.). |
| `components/LandingPage.tsx` | Client component. Injecta o markup via `dangerouslySetInnerHTML` e executa os scripts em `useEffect` após mount. |

A escolha de `dangerouslySetInnerHTML` preserva 100% da fidelidade visual do HTML original sem reescrever centenas de inline `style="..."` para objectos JSX.

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Próximos passos sugeridos
1. Migrar o markup para componentes JSX por secção (Hero, Services, FAQ, …) — útil quando se quiser tornar dinâmico (CMS, i18n).
2. Substituir Google Fonts via `<link>` por `next/font/google` para auto-hosting.
3. Adicionar imagens optimizadas via `next/image` quando se introduzirem assets reais.
