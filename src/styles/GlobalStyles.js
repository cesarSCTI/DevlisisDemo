import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --bg: #fafaf8;
    --bg-raised: #f0ede8;
    --bg-surface: #ffffff;
    --text-hi: #111111;
    --text-mid: #6b6b6b;
    --text-lo: #a3a3a3;
    --border: rgba(0, 0, 0, 0.07);
    --border-strong: rgba(0, 0, 0, 0.14);
    --accent: #2563eb;
    --accent-dark: #4338ca;
    --accent-light: #eef2ff;
    --radius: 16px;
    --radius-sm: 8px;
    --radius-pill: 999px;
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.03);
    --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.07), 0 2px 8px rgba(0, 0, 0, 0.04);
    --shadow-accent: 0 4px 20px rgba(37, 99, 235, 0.22);
    --shadow-accent-lg: 0 8px 36px rgba(37, 99, 235, 0.32);
    --z-grain: 150;
    --z-navbar: 100;
    --z-mobile-menu: 99;
    --z-burger: 101;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Outfit', 'Segoe UI', system-ui, sans-serif;
    background-color: var(--bg);
    color: var(--text-hi);
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: var(--z-grain);
    opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
    mix-blend-mode: multiply;
  }

  h1, h2, h3 { text-wrap: balance; }
  a { text-decoration: none; color: inherit; }
  ul { list-style: none; }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  input, textarea { font-family: inherit; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg-raised); }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.18);
    border-radius: 3px;
  }

  .skip-link {
    position: absolute;
    top: -100%;
    left: 1rem;
    padding: 0.45rem 1rem;
    background: var(--accent);
    color: #fff;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 0.88rem;
    z-index: 9999;
    text-decoration: none;

    &:focus-visible {
      top: 1rem;
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles;
