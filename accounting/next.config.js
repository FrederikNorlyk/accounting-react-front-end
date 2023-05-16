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
}

module.exports = nextConfig
