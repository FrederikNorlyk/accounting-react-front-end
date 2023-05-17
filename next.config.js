/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/expenses',
                permanent: true,
            },
        ];
    },
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
