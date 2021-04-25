# Contributing

This document describes the mechanics of our development process.

If you are unsure how to make a change, you can bring it up in our [Gitter channel](https://gitter.im/skill-collectors/weather-app). If it's a complicated issue that might require a long conversation, you can [create an issue](https://github.com/skill-collectors/weather-app/issues/new/choose) to have a separate place to have that conversation.

## Pull Request Process

We use the [GitHub Flow](https://guides.github.com/introduction/flow/) branching strategy.

Before opening your PR, ensure that all GitHub checks pass.

When you are ready, request a review from either a specific person/people or from the whole skill-collectors/weather-app-devs group. Someone will review and either request changes or approve.

Requesting approval assumes that the PR can be merged by the approver once approved. If you want someone to look at your PR, but you aren't ready for it to be merged, create a [draft Pull Request](https://github.blog/2019-02-14-introducing-draft-pull-requests/) and then `@mention` someone in the comments to get their opinion.

## Versioning

This application uses [Semver](https://semver.org/) as a versioning strategy, but it's admittedly not obvious how to apply that to an application rather than a library. Here's our take:

Given a version number `[MAJOR].[MINOR].[PATCH]`, we

- Increment the **PATCH** number for changes that are not visible in the user interface. For example:
	- Dependency updates
	- Bug fixes in the implementation
	- Refactoring without any functional change
- Increment the **MINOR** number for changes that are visible in the user interface. For example:
	- CSS and other layout changes
	- Text changes (even minor ones including typo fixes)
	- A new UXP component (e.g. new button).
- Increment the **MAJOR** number for major architectural changes. Examples may include:
	- Building and packaging as a mobile app (i.e. an actual apk file for Android)
	- Upgrading from Vue 2 to Vue 3
	- Replacing bootstrap-vue with a different UI framework

