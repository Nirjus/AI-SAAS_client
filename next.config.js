/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack(config, option){
        config.module.rules.push({
            test: /\.(mp4|webm)$/,
           type: 'asset/resource',
          });
          return config;
    },
    images:{
        domains:["lh3.googleusercontent.com", "res.cloudinary.com", "replicate.delivery", "pixner.net"]
    },
}

module.exports = nextConfig
