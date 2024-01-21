/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
          {
            source: "/",
            destination: "/index.html",
          }
        ]
    }
};

module.exports = nextConfig;

