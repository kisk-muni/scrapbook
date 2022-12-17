module.exports = {
  experimental: { appDir: true },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
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
