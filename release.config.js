module.exports = {
  "plugins": [
      ["@semantic-release/commit-analyzer", {
          "releaseRules": [
              { "type": "chore", "scope": "deps", "release": "patch" },
              { "type": "docs", "scope": "README", "release": "patch" },
          ]
      }],
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      [
        "@semantic-release/exec",
        {
            prepareCmd: "npm version ${nextRelease.version} --no-git-tag-version && yarn build",
            publishCmd: "npm publish ./dist --registry=https://registry.npmjs.org/ --provenance"
        }
      ],
      "@semantic-release/github",
      "@semantic-release/git"
  ],
  "preset": "angular"
};
