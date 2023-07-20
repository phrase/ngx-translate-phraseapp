module.exports = {
  "plugins": [
      ["@semantic-release/commit-analyzer", {
          "releaseRules": [
              {"type": "chore", "scope": "deps", "release": "patch"}
          ]
      }],
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      ["@semantic-release/npm", {
          "pkgRoot": "dist/",
          "tarballDir": "release"
      }],
      ["@semantic-release/github", {
          "assets": [
            { "path": "dist/", "label": "Package distribution" },
          ]
      }],
      "@semantic-release/git"
  ],
  "preset": "angular"
};
