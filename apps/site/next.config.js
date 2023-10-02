module.exports = {
  experimental: { appDir: true },
  transpilePackages: ['shared'],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/avatar/:path*',
        destination: '/api/avatar/:path*',
      },
      {
        source: '/feed.xml',
        destination: '/api/feed.xml',
      },
    ];
  },
};
