const path = require("path");

module.exports = async (basePath, phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    redirects: () => {
      return [
        {
          source: "/operators",
          destination: "/operators/recruitment",
          permanent: true,
        },
      ];
    },
    webpack: (config, options) => {
      config.module.rules.push(
        {
          include: [
            path.resolve(basePath, "/"),
            path.resolve(__dirname, "./components/icons"),
          ],
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.yml$/,
          use: [
            { loader: require.resolve("json-loader") },
            {
              loader: require.resolve("yaml-loader"),
              options: {
                asJSON: true,
              },
            },
          ],
        }
      );
      config.resolve.extensions.push(".yml");

      return config;
    },
  };
  return nextConfig;
};
