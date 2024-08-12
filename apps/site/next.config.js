const nextConfig = {
  experimental: {
    mdxRs: true,
    missingSuspenseWithCSRBailout: false,
  },
  transpilePackages: ['shared'],
  pageExtensions: ['ts', 'tsx', 'mdx'],
  serverComponentsExternalPackages: [
    '@aws-sdk/client-s3',
    '@aws-sdk/s3-request-presigner',
  ],
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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**',
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

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
