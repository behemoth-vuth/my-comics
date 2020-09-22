const { environment } = require("@rails/webpacker");
const path = require("path");

const resolver = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "..", "..", "app/javascript/src"),
    },
  },
};
environment.config.merge(resolver);

module.exports = environment;
