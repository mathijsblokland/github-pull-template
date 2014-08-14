github-pull-template
====================

A Google Chrome and Firefox extension to inserts a default template for pull requests.

Note: Because Chrome extensions can't handle symlinks for (scripts/css) we need to copy the src file `github-pull-template.js` to the `/chrome/src/` folder when we are generating the new extension.


###How to install
####Firefox
Just download the [.xpi](https://github.com/mathijsblokland/github-pull-template/raw/master/extension/firefox/install/github-pr-emplate.xpi) and install it through the extensions tab (`about:addons`) with the option to `Install Add-on From File...`(see this [img](http://img.springe.st/2014_08_14_10_33_17_kf4om.png)). 

**Auto Updating:** If you want to auto update this extension you can do this by enabling the [automatic updates](http://img.springe.st/2014_08_14_10_39_53_3k8jw.png).


####Chrome
Just download and drop the [.crx](https://github.com/mathijsblokland/github-pull-template/raw/master/extension/chrome/install/github-pr-template.crx) file in your `chrome://extensions/` and click **'add'** (see this [.gif](http://img.springe.st/extensioninstall.gif)).

**Auto Updating:** In the extensions tab enable the **developer mode** and hit **update extensions now** (see this [.gif](http://img.springe.st/extensionupdate.gif)).

----


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

