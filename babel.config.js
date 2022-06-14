module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": { "esmodules": true },
      "loose": true
    }]
  ],
  plugins: [
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
  ]
};
