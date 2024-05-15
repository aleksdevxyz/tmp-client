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
    i18n:{
        locales:['ru', 'en', 'es', 'fr','de', 'it', 'pt'],
        defaultLocale: 'ru'
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

export default nextConfig;
