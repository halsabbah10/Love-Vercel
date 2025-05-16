const nextConfig = {
  // Remove output: 'export' since Vercel handles SSR
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.pexels.com'], // Add Pexels domain for images
    unoptimized: false, // Enable image optimization
  },
  swcMinify: true, // Enable SWC minification
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    
    // Optimize bundle size
    config.optimization = {
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      }
    };

    return config;
  }
};

module.exports = nextConfig;