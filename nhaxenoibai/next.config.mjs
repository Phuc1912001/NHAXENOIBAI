import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `
    @import "src/common/scss/mixins/_mixin.scss";
    @import "src/common/scss/variables/_variable.scss";
    `,
    includePaths: [path.resolve("./src/common/scss")],
  },
  images: {
    domains: ['nhaxesanbay.s3.amazonaws.com'],
  },
  reactStrictMode: false
};

export default nextConfig;
