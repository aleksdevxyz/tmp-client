import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use:[{
                loader: '@svgr/webpack',
            options: {
                icon: true,
            }
            }]
        })
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'teleshtorm.net',
                pathname: '/static/**'
            }
        ]
    }
};

export default withNextIntl(nextConfig);