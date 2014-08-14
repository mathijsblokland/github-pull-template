require("sdk/preferences/service").set("javascript.options.strict", false);

// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");

// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: /.*github.com\/Springest\/.*\/compare\/.*/,
  contentScriptFile: [self.data.url("jquery-2.1.1.min.js"), self.data.url("github-pr-template.js")]
});
