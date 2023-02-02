/** @type {import('next').NextConfig} */
const withLinaria = require("next-linaria");

module.exports = withLinaria({
  reactStrictMode: true,
  images: {
    domains: ["s.gravatar.com"],
    domains: ["lh3.googleusercontent.com"],
  },
});
