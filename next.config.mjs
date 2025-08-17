/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com' , 'picsum.photos'],
    },
    experimental: {
        turbo: {
            devOverlay: false, // Turbopack ka overlay icon hide karega
        },
    },
};

export default nextConfig;
