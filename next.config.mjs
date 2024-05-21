/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    async rewrites(){
        return {
            
        }
    },
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
                hostname: 'cdn.teleshtorm.org'
            }
        ]
    }
};

export default withNextIntl(nextConfig);
