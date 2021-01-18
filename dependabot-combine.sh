#!/bin/bash

set -e # The '-e' option causes bash to exit on errors

git stash

git checkout master
git pull --all
git checkout -b "dependabot/$(date +%F)"

# This won't work if the branch name ever has spaces
for branch in $(git branch -r | grep dependabot | sed 's/^\s\+//'); do
	echo "Attempting to cherry-pick ${branch}"
	git cherry-pick "${branch}" || true # don't fail the whole script on merge conflicts
	if [[ -n "$(git diff --name-only --diff-filter=U)" ]]; then
		echo "There were merge conflicts while cherry-picking ${branch}"
		git mergetool package.json # Don't bother merging package-lock.json
		npm install
		git add package.json package-lock.json
		git cherry-pick --continue
	else
		npm install # still need to do this for the test build
	fi
	if npm run test:unit && npm run build && npm run build-storybook; then
		echo "Build succeeded after cherry-picking ${branch}"
		git add package.json package-lock.json
		git commit --amend --no-edit
	else
		echo "Build failed after cherry-picking ${branch}. Discarding the commit."
		git reset --hard HEAD^
		npm install # Reset dependencies as well
	fi
done

rm -f package.json.orig # Remove mergetool backup file, if present.
git log --oneline master..HEAD

echo "***Don't forget to increment the version***"

git stash pop

