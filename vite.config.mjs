import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  // Trailing slash guaranteed; empty when unset (relative og:image)
  const siteUrl = env.VITE_SITE_URL ? env.VITE_SITE_URL.replace(/\/?$/, '/') : '';
  return {
  // Relative paths so the built site works from any folder or sub-path (GitHub Pages, Netlify, etc.)
  base: './',
  plugins: [
    react(),
    { name: 'site-url', transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl) },
  ],
  };
});
