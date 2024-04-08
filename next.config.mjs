/** @type {import('next').NextConfig} */
// import i18n from './next-i18next.config.js'

const nextConfig = {
    reactStrictMode: false,
    i18n: {
        locales: ['en', 'id'],
        defaultLocale: 'en',
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
            {
                source: '/administrator',
                destination: '/administrator/dashboard',
                permanent: true,
            },
            {
                source: '/member',
                destination: '/member/dashboard',
                permanent: true,
            },
            {
                source: '/author',
                destination: '/author/articles',
                permanent: true,
            },
            {
                source: '/author',
                destination: '/author/articles',
                permanent: true,
            },
            {
                source: '/administrator/verification-agronomy',
                destination: '/administrator/verification-agronomy/population-size',
                permanent: true,
            },
            {
                source: '/member/verification-agronomy',
                destination: '/administrator/verification-agronomy/population-size',
                permanent: true,
            },
        ]
    },
}

export default nextConfig
