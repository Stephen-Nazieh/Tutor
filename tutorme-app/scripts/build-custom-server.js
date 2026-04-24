const esbuild = require('esbuild')

async function build() {
  console.log('Building custom server with Socket.io...')
  try {
    await esbuild.build({
      entryPoints: ['server.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',
      outfile: 'server-production.js',
      external: [
        'next',
        'pg',
        'pg-native',
        'canvas',
        'jsdom',
        'bufferutil',
        'utf-8-validate',
        'esbuild',
      ],
      // We bundle our application code but keep 'next' external as it is handled by the standalone build
    })
    console.log('Successfully built server-production.js')
  } catch (error) {
    console.error('Failed to build custom server:', error)
    process.exit(1)
  }
}

build()
