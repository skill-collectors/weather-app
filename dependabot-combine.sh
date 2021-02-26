#!/bin/bash

set -e # The '-e' option causes bash to exit on errors

# Color codes for colored output
RED='\033[0;31m'
NC='\033[0m' # No Color

quiet() {
	local command=$1
	shift
	if [[ "${DEBUG}" == "true" ]]; then
		$command $@
	elif [[ -w "${LOG_FILE}" ]]; then
		$command $@ &> "${LOG_FILE}"
	else
		$command $@ &> /dev/null
	fi
}

if [[ -n "$(git status -s)" ]]; then
  echo 'You have uncommited changes. Please stash them before running this script.'
fi

git checkout master
git pull --all
git checkout -b "dependabot/$(date +%F)"

# Setting the editor to the 'true' command prevents prompting to edit commit messages
export GIT_EDITOR=true

# This won't work if the branch name ever has spaces
for branch in $(git branch -r | grep dependabot | sed 's/^\s\+//'); do
	echo "Attempting to cherry-pick ${branch}"
	git cherry-pick "${branch}" || true # don't fail the whole script on merge conflicts
	if [[ -n "$(git diff --name-only --diff-filter=U)" ]]; then
		echo "    There were merge conflicts while cherry-picking ${branch}"
		git mergetool package.json # Don't bother merging package-lock.json
		quiet npm install
		git add package.json package-lock.json
		git cherry-pick --continue
	else
		quiet npm install # still need to do this for the test build
	fi
	if quiet npm run test:unit && quiet npm run build && quiet npm run build-storybook; then
		echo "    Build succeeded after cherry-picking ${branch}"
		git add package.json package-lock.json
		git commit --amend
	else
		echo -e "    ${RED}BUILD FAILED after cherry-picking ${branch}. Discarding the commit.${NC}"
		git reset --hard HEAD^
		quiet npm install # Reset dependencies as well
	fi
done

rm -f package.json.orig # Remove mergetool backup file, if present.
git log --oneline master..HEAD

echo "***Don't forget to increment the version***"

