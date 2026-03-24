import { withSentryConfig } from '@sentry/nextjs'
import createNextIntlPlugin from 'next-intl/plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // 7.1 Frontend performance: bundle size and code splitting
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**', pathname: '/**' },
      { protocol: 'http', hostname: 'localhost', pathname: '/**' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },
  turbopack: {
    root: __dirname,
  },
  serverExternalPackages: ['pg', 'pg-native', 'jspdf', 'jspdf-autotable'],
  webpack: (config, { isServer }) => {
    // Fix for jspdf/fflate Node.js worker issue
    // Redirect node-specific fflate to browser version
    config.resolve.alias = {
      ...config.resolve.alias,
      'fflate/lib/node.cjs': false,
      'fflate/lib/node.js': false,
    };
    
    // Handle jspdf node-specific imports
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    return config;
  },
  // Security headers (CSP, X-Frame-Options, etc.) are set by middleware.ts
  // to avoid duplication and ensure consistent policy.
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }
        ]
      }
    ]
  }
};

const nextIntlConfig = withNextIntl(nextConfig);

// Only wrap with Sentry if org and project are configured
const sentryOrg = process.env.SENTRY_ORG;
const sentryProject = process.env.SENTRY_PROJECT;

export default sentryOrg && sentryProject
  ? withSentryConfig(nextIntlConfig, {
      org: sentryOrg,
      project: sentryProject,
      silent: !process.env.CI,
    })
  : nextIntlConfig;
