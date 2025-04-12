const isJest = process.env.NODE_ENV === "test";

module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    "ts-nameof",
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-object-rest-spread",
    "@babel/plugin-transform-optional-catch-binding",
    isJest && "@babel/plugin-transform-modules-commonjs"
  ].filter(Boolean)
};
