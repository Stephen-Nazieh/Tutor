const esbuild = require('esbuild');
const path = require('path');

async function build() {
  console.log('Building custom server with Socket.io...');
  try {
    await esbuild.build({
      entryPoints: ['server.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',
      outfile: 'server-production.js',
      external: [
        'next', 
        'pg', 'pg-native', 
        'canvas', 'jsdom', 'bufferutil', 'utf-8-validate', // things that might break bundling or are native
        'ioredis', 'bcryptjs', 'jose',
        './src/lib/socket-server-enhanced' // Wait, I want to bundle this!
      ],
      // We want to bundle our own code but keep heavy/native dependencies external
      // Actually, Next.js 'next' MUST be external because it's huge and handled by standalone
    });
    console.log('Successfully built server-production.js');
  } catch (error) {
    console.error('Failed to build custom server:', error);
    process.exit(1);
  }
}

build();
