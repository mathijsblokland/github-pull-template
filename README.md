github-pull-template
====================

A Google Chrome and Firefox extension to inserts a default template for pull requests.

Note: Because Chrome extensions can't handle symlinks for (scripts/css) we need to copy the src file `github-pull-template.js` to the `/chrome/src/` folder when we are generating the new extension.


###Changes
````
0.0.8 - Updated the readability and implemented a small change suggested by @derekkraan
0.0.7 - Created the firefox extension (and moved around some files)
0.0.6 - Generate links for all mentioned Asana tasks
0.0.5 - By default uncheck the 'Changes are demoed to the stakeholder' checkbox
0.0.4 - Updated the PRB with test steps and default question answers
0.0.3 - Auto generate Asana link from asana hash in commit messages
0.0.2 - Changed how we set the branchnames for the CodeClimate link
0.0.1 - initial version with the default pr body
````

