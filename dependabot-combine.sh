#!/bin/bash

set -e # The '-e' option causes bash to exit on errors

git checkout master
git pull --all --remote
git checkout -b "dependabot/$(date +%F)"

# Cherry-pick all remote dependabot branches. Ending with "|| true" prevents bash from exiting when cherry-pick "fails" on merge conflicts.
git branch -r | grep dependabot | sed 's/^\s\+//' | sort | xargs git cherry-pick || true

# Use mergetool until there are no more conflicts
while [[ -n "$(git diff --name-only --diff-filter=U)" ]]; do
	git mergetool package.json # Don't bother merging package-lock.json
	npm install # Just regenerate package-lock.json
	git add package.json package-lock.json
	git cherry-pick --continue || true # Ignore conflict "failures" with '|| true'. We'll get them in the next loop.
done
rm -f package.json.orig # Remove mergetool backup file, if present.
git log --oneline master..HEAD

echo "***Don't forget to increment the version***"

