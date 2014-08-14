#!/bin/bash -e
#
# Purpose: Pack extensions for Chrome and Firefox
#

# gsed increment build revision
fver="version.txt"
orig_version=$(head -n 1 "$fver")
(gsed -r -i"" 's/^([0-9]+\.[0-9]\.)([0-9]+)/echo \1$((\2+1))/e' "$fver")
new_version=$(head -n 1 "$fver")

# bump Chrome update_manifest.xml
sed_update_manifest="s/\.crx\" version=\".*\\?\"/\.crx\" version=\"$new_version\"/"
(gsed -i"" "$sed_update_manifest" "extension/chrome/update_manifest.xml")
# bump Chrome manifest.json
sed_src_manifest="s/\"version\": \".*\\?\"/\"version\": \"$new_version\"/"
(gsed -i"" "$sed_src_manifest" "extension/chrome/src/manifest.json")
echo "Updated version in Chrome manifest.json & update_manifest.xml"

# bump FF package.json
sed_src_manifest="s/\"version\": \".*\\?\"/\"version\": \"$new_version\"/"
(gsed -i"" "$sed_src_manifest" "extension/firefox/package.json")
echo "Updated version in Firefox package.json"

# Copy the src file to the Chrome src folder because symlinks are not supported
cp src/github-pr-template.js extension/chrome/src/github-pr-template.js
echo "Copied github-pr-template.js to chrome/src folder"

# Generate Chrome extension with crxmake.sh
sh crxmake.sh extension/chrome/src extension/chrome/install/github-pr-template.pem extension/chrome/install/github-pr-template.crx

# Generate Firefox extension
cd extension/firefox
cfx xpi --update-link https://raw.githubusercontent.com/mathijsblokland/github-pull-template/master/extension/firefox/install/github-pr-emplate.xpi --update-url https://raw.githubusercontent.com/mathijsblokland/github-pull-template/master/extension/firefox/install/github-pr-emplate.update.rdf
echo "Wrote Firefox extension"

# Move the generated Firefox files into the install folder
mv github-pr-emplate.update.rdf install/github-pr-emplate.update.rdf
mv github-pr-emplate.xpi install/github-pr-emplate.xpi
echo "Moved the Firefox extension files into the install folder"

echo "========="
echo "Done, we are now on version "$new_version" :)"
echo "========="
